import { Router } from "express";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { bookingSchema, listingSchema } from "@localxplore/shared";
import { asyncHandler } from "../../middleware/async-handler.js";
import { requireAuth, requirePermission } from "../../middleware/auth.js";
import { resolveTenant } from "../../middleware/tenant.js";
import { validate } from "../../middleware/validate.js";
import { ApiError } from "../../lib/errors.js";
import { prisma } from "../../lib/prisma.js";
import { tenantExecute, tenantQuery } from "../../lib/tenant-db.js";
import { enforceBookingLimit, enforceListingLimit } from "../../middleware/plan-limits.js";
import { notificationQueue } from "../../lib/queue.js";

const listingUpdateSchema = listingSchema.partial();
const bookingStatusSchema = z.object({
  bookingStatus: z.enum(["pending", "confirmed", "cancelled", "completed", "no_show"]),
});

export const tenantRouter = Router();

tenantRouter.use(requireAuth, resolveTenant);

tenantRouter.get(
  "/listings",
  requirePermission("manage_listings"),
  asyncHandler(async (req, res) => {
    const rows = await tenantQuery(req.tenant!.schemaName, "SELECT * FROM listings ORDER BY created_at DESC");
    res.json(rows);
  }),
);

tenantRouter.post(
  "/listings",
  requirePermission("manage_listings"),
  enforceListingLimit,
  validate(listingSchema),
  asyncHandler(async (req, res) => {
    const body = req.body;
    const id = randomUUID();

    await tenantExecute(
      req.tenant!.schemaName,
      `INSERT INTO listings (
        id, type, name, slug, description, short_description, location,
        max_participants, base_price, currency, status, created_at, updated_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,'draft',NOW(),NOW())`,
      [
        id,
        body.type,
        body.name,
        body.slug,
        body.description,
        body.shortDescription,
        body.location,
        body.maxParticipants,
        body.basePrice,
        body.currency,
      ],
    );

    const created = await tenantQuery(req.tenant!.schemaName, "SELECT * FROM listings WHERE id = $1", [id]);
    res.status(201).json(created[0]);
  }),
);

tenantRouter.get(
  "/listings/:id",
  requirePermission("manage_listings"),
  asyncHandler(async (req, res) => {
    const rows = await tenantQuery(req.tenant!.schemaName, "SELECT * FROM listings WHERE id = $1", [req.params.id]);
    if (!rows[0]) {
      throw new ApiError(404, "Listing not found");
    }

    res.json(rows[0]);
  }),
);

tenantRouter.put(
  "/listings/:id",
  requirePermission("manage_listings"),
  validate(listingUpdateSchema),
  asyncHandler(async (req, res) => {
    const body = req.body as Record<string, unknown>;
    const mappings: Record<string, string> = {
      type: "type",
      name: "name",
      slug: "slug",
      description: "description",
      shortDescription: "short_description",
      location: "location",
      maxParticipants: "max_participants",
      basePrice: "base_price",
      currency: "currency",
    };

    const updates: string[] = [];
    const values: unknown[] = [];
    let index = 1;

    for (const [key, value] of Object.entries(body)) {
      const column = mappings[key];
      if (!column || value === undefined) {
        continue;
      }
      updates.push(`${column} = $${index++}`);
      values.push(value);
    }

    if (!updates.length) {
      throw new ApiError(400, "No fields provided for update");
    }

    values.push(req.params.id);
    await tenantExecute(
      req.tenant!.schemaName,
      `UPDATE listings SET ${updates.join(", ")}, updated_at = NOW() WHERE id = $${index}`,
      values,
    );

    const rows = await tenantQuery(req.tenant!.schemaName, "SELECT * FROM listings WHERE id = $1", [req.params.id]);
    if (!rows[0]) {
      throw new ApiError(404, "Listing not found");
    }

    res.json(rows[0]);
  }),
);

tenantRouter.delete(
  "/listings/:id",
  requirePermission("manage_listings"),
  asyncHandler(async (req, res) => {
    await tenantExecute(req.tenant!.schemaName, "DELETE FROM listings WHERE id = $1", [req.params.id]);
    res.status(204).send();
  }),
);

tenantRouter.get(
  "/bookings",
  requirePermission("view_bookings"),
  asyncHandler(async (req, res) => {
    const where: string[] = [];
    const values: unknown[] = [];

    if (req.query.status) {
      values.push(req.query.status);
      where.push(`b.booking_status = $${values.length}`);
    }

    if (req.query.date) {
      values.push(req.query.date);
      where.push(`b.booking_date = $${values.length}`);
    }

    const rows = await tenantQuery(
      req.tenant!.schemaName,
      `SELECT b.*, c.first_name, c.last_name, c.email, l.name as listing_name
       FROM bookings b
       JOIN customers c ON c.id = b.customer_id
       JOIN listings l ON l.id = b.listing_id
       ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
       ORDER BY b.created_at DESC`,
      values,
    );

    res.json(rows);
  }),
);

tenantRouter.post(
  "/bookings",
  requirePermission("create_bookings"),
  enforceBookingLimit,
  validate(bookingSchema),
  asyncHandler(async (req, res) => {
    const { listingId, bookingDate, numberOfParticipants, customer, specialRequests } = req.body;
    const listingRows = await tenantQuery<{ base_price: number }>(req.tenant!.schemaName, "SELECT base_price FROM listings WHERE id = $1", [listingId]);
    if (!listingRows[0]) {
      throw new ApiError(404, "Listing not found");
    }

    const totalAmount = Number(listingRows[0].base_price) * numberOfParticipants;

    const existingCustomer = await tenantQuery<{ id: string }>(req.tenant!.schemaName, "SELECT id FROM customers WHERE email = $1", [customer.email]);
    const customerId = existingCustomer[0]?.id ?? randomUUID();

    if (!existingCustomer[0]) {
      await tenantExecute(
        req.tenant!.schemaName,
        `INSERT INTO customers (id, first_name, last_name, email, phone, created_at, updated_at)
         VALUES ($1,$2,$3,$4,$5,NOW(),NOW())`,
        [customerId, customer.firstName, customer.lastName, customer.email, customer.phone],
      );
    }

    const bookingId = randomUUID();
    const bookingNumber = `LXP-${Date.now().toString().slice(-8)}`;

    await tenantExecute(
      req.tenant!.schemaName,
      `INSERT INTO bookings (
        id, booking_number, listing_id, customer_id, booking_date, number_of_participants,
        participants, total_amount, payment_status, booking_status, special_requests,
        platform_commission, created_at, updated_at
      ) VALUES (
        $1,$2,$3,$4,$5,$6,'[]'::jsonb,$7,'pending','pending',$8,
        $9,NOW(),NOW()
      )`,
      [bookingId, bookingNumber, listingId, customerId, bookingDate, numberOfParticipants, totalAmount, specialRequests ?? "", totalAmount * 0.05],
    );

    const created = await tenantQuery(req.tenant!.schemaName, "SELECT * FROM bookings WHERE id = $1", [bookingId]);

    await notificationQueue.add("send-booking-confirmation", {
      tenantId: req.tenant!.id,
      bookingId,
      customerEmail: customer.email,
    });

    res.status(201).json(created[0]);
  }),
);

tenantRouter.get(
  "/bookings/:id",
  requirePermission("view_bookings"),
  asyncHandler(async (req, res) => {
    const rows = await tenantQuery(
      req.tenant!.schemaName,
      `SELECT b.*, c.first_name, c.last_name, c.email, c.phone, l.name as listing_name
       FROM bookings b
       JOIN customers c ON c.id = b.customer_id
       JOIN listings l ON l.id = b.listing_id
       WHERE b.id = $1`,
      [req.params.id],
    );

    if (!rows[0]) {
      throw new ApiError(404, "Booking not found");
    }

    res.json(rows[0]);
  }),
);

tenantRouter.put(
  "/bookings/:id/status",
  requirePermission("manage_inventory"),
  validate(bookingStatusSchema),
  asyncHandler(async (req, res) => {
    await tenantExecute(
      req.tenant!.schemaName,
      "UPDATE bookings SET booking_status = $1, updated_at = NOW() WHERE id = $2",
      [req.body.bookingStatus, req.params.id],
    );

    const rows = await tenantQuery(req.tenant!.schemaName, "SELECT * FROM bookings WHERE id = $1", [req.params.id]);
    if (!rows[0]) {
      throw new ApiError(404, "Booking not found");
    }

    res.json(rows[0]);
  }),
);

tenantRouter.get(
  "/customers",
  requirePermission("manage_clients"),
  asyncHandler(async (req, res) => {
    const rows = await tenantQuery(
      req.tenant!.schemaName,
      `SELECT c.*, COUNT(b.id)::int as total_bookings, COALESCE(SUM(b.total_amount),0) as lifetime_value
       FROM customers c
       LEFT JOIN bookings b ON b.customer_id = c.id
       GROUP BY c.id
       ORDER BY c.created_at DESC`,
    );

    res.json(rows);
  }),
);

tenantRouter.get(
  "/analytics",
  requirePermission("view_reports"),
  asyncHandler(async (req, res) => {
    const [todayBookings, monthlyRevenue, pendingInquiries, totalCustomers] = await Promise.all([
      tenantQuery<{ count: number }>(req.tenant!.schemaName, "SELECT COUNT(*)::int as count FROM bookings WHERE booking_date = CURRENT_DATE"),
      tenantQuery<{ amount: number }>(
        req.tenant!.schemaName,
        "SELECT COALESCE(SUM(total_amount),0)::float as amount FROM bookings WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', NOW())",
      ),
      tenantQuery<{ count: number }>(req.tenant!.schemaName, "SELECT COUNT(*)::int as count FROM bookings WHERE booking_status = 'pending'"),
      tenantQuery<{ count: number }>(req.tenant!.schemaName, "SELECT COUNT(*)::int as count FROM customers"),
    ]);

    res.json({
      todayBookings: todayBookings[0]?.count ?? 0,
      monthlyRevenue: monthlyRevenue[0]?.amount ?? 0,
      pendingInquiries: pendingInquiries[0]?.count ?? 0,
      totalCustomers: totalCustomers[0]?.count ?? 0,
    });
  }),
);

tenantRouter.get(
  "/branding",
  requirePermission("configure_branding"),
  asyncHandler(async (req, res) => {
    const tenant = await prisma.tenant.findUnique({
      where: { id: req.tenant!.id },
      select: { brandingSettings: true, businessName: true, subdomain: true, customDomain: true },
    });

    if (!tenant) {
      throw new ApiError(404, "Tenant not found");
    }

    res.json(tenant);
  }),
);

tenantRouter.put(
  "/branding",
  requirePermission("configure_branding"),
  asyncHandler(async (req, res) => {
    const updated = await prisma.tenant.update({
      where: { id: req.tenant!.id },
      data: { brandingSettings: req.body },
      select: { brandingSettings: true },
    });

    res.json(updated);
  }),
);
