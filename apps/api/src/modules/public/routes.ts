import { Router } from "express";
import { z } from "zod";
import { randomUUID } from "node:crypto";
import { asyncHandler } from "../../middleware/async-handler.js";
import { resolveTenant } from "../../middleware/tenant.js";
import { validate } from "../../middleware/validate.js";
import { ApiError } from "../../lib/errors.js";
import { tenantExecute, tenantQuery } from "../../lib/tenant-db.js";

const calculateBookingSchema = z.object({
  listingId: z.string().uuid(),
  participants: z.number().int().positive(),
});

const createPublicBookingSchema = z.object({
  listingId: z.string().uuid(),
  bookingDate: z.string(),
  numberOfParticipants: z.number().int().positive(),
  customer: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string(),
  }),
});

export const publicRouter = Router();
publicRouter.use(resolveTenant);

publicRouter.get(
  "/listings",
  asyncHandler(async (req, res) => {
    const rows = await tenantQuery(
      req.tenant!.schemaName,
      "SELECT * FROM listings WHERE status = 'active' ORDER BY featured DESC, created_at DESC",
    );
    res.json(rows);
  }),
);

publicRouter.get(
  "/listings/:slug",
  asyncHandler(async (req, res) => {
    const rows = await tenantQuery(req.tenant!.schemaName, "SELECT * FROM listings WHERE slug = $1 AND status = 'active'", [req.params.slug]);
    if (!rows[0]) {
      throw new ApiError(404, "Listing not found");
    }

    await tenantExecute(req.tenant!.schemaName, "UPDATE listings SET view_count = view_count + 1 WHERE id = $1", [rows[0].id]);
    res.json(rows[0]);
  }),
);

publicRouter.get(
  "/availability/:listingId",
  asyncHandler(async (req, res) => {
    const rows = await tenantQuery(
      req.tenant!.schemaName,
      "SELECT * FROM availability WHERE listing_id = $1 AND date >= CURRENT_DATE AND is_available = TRUE ORDER BY date ASC",
      [req.params.listingId],
    );
    res.json(rows);
  }),
);

publicRouter.post(
  "/bookings/calculate",
  validate(calculateBookingSchema),
  asyncHandler(async (req, res) => {
    const listing = await tenantQuery<{ base_price: number }>(req.tenant!.schemaName, "SELECT base_price FROM listings WHERE id = $1", [req.body.listingId]);
    if (!listing[0]) {
      throw new ApiError(404, "Listing not found");
    }

    const subtotal = Number(listing[0].base_price) * req.body.participants;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    res.json({ subtotal, tax, total });
  }),
);

publicRouter.post(
  "/bookings",
  validate(createPublicBookingSchema),
  asyncHandler(async (req, res) => {
    const { listingId, bookingDate, numberOfParticipants, customer } = req.body;

    const listing = await tenantQuery<{ base_price: number }>(req.tenant!.schemaName, "SELECT base_price FROM listings WHERE id = $1", [listingId]);
    if (!listing[0]) {
      throw new ApiError(404, "Listing not found");
    }

    const existingCustomer = await tenantQuery<{ id: string }>(req.tenant!.schemaName, "SELECT id FROM customers WHERE email = $1", [customer.email]);
    const customerId = existingCustomer[0]?.id ?? randomUUID();

    if (!existingCustomer[0]) {
      await tenantExecute(
        req.tenant!.schemaName,
        "INSERT INTO customers (id, first_name, last_name, email, phone, created_at, updated_at) VALUES ($1,$2,$3,$4,$5,NOW(),NOW())",
        [customerId, customer.firstName, customer.lastName, customer.email, customer.phone],
      );
    }

    const totalAmount = Number(listing[0].base_price) * numberOfParticipants;
    const bookingId = randomUUID();
    const bookingNumber = `LXP-${Date.now().toString().slice(-8)}`;

    await tenantExecute(
      req.tenant!.schemaName,
      `INSERT INTO bookings (
        id, booking_number, listing_id, customer_id, booking_date, number_of_participants,
        participants, total_amount, payment_status, booking_status, platform_commission, created_at, updated_at
      ) VALUES ($1,$2,$3,$4,$5,$6,'[]'::jsonb,$7,'pending','pending',$8,NOW(),NOW())`,
      [bookingId, bookingNumber, listingId, customerId, bookingDate, numberOfParticipants, totalAmount, totalAmount * 0.05],
    );

    res.status(201).json({
      bookingId,
      bookingNumber,
      status: "pending",
      totalAmount,
    });
  }),
);

publicRouter.get(
  "/reviews/:listingId",
  asyncHandler(async (req, res) => {
    const rows = await tenantQuery(
      req.tenant!.schemaName,
      `SELECT r.*, c.first_name, c.last_name
       FROM reviews r
       JOIN customers c ON c.id = r.customer_id
       WHERE r.listing_id = $1 AND r.status = 'approved'
       ORDER BY r.created_at DESC`,
      [req.params.listingId],
    );

    res.json(rows);
  }),
);
