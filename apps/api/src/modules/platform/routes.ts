import { Router } from "express";
import { z } from "zod";
import { nanoid } from "nanoid";
import { createTenantSchema } from "@localxplore/shared";
import { asyncHandler } from "../../middleware/async-handler.js";
import { requireAuth, requirePermission } from "../../middleware/auth.js";
import { validate } from "../../middleware/validate.js";
import { prisma } from "../../lib/prisma.js";
import { ApiError } from "../../lib/errors.js";
import { bootstrapTenantSchema } from "../../lib/tenant-schema.js";

const platformTenantUpdateSchema = z.object({
  status: z.enum(["active", "suspended", "trial", "cancelled"]).optional(),
  customDomain: z.string().optional(),
  planCode: z.enum(["starter", "growth", "enterprise"]).optional(),
});

export const platformRouter = Router();

platformRouter.use(requireAuth);

platformRouter.get(
  "/plans",
  requirePermission("manage_plans"),
  asyncHandler(async (_req, res) => {
    const plans = await prisma.plan.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });
    res.json(plans);
  }),
);

platformRouter.post(
  "/tenants",
  requirePermission("manage_all_tenants"),
  validate(createTenantSchema),
  asyncHandler(async (req, res) => {
    const plan = await prisma.plan.findUnique({ where: { code: req.body.planCode } });
    if (!plan) {
      throw new ApiError(404, "Plan not found");
    }

    const schemaName = `tenant_${req.body.subdomain.replace(/-/g, "_")}`;
    const tenant = await prisma.tenant.create({
      data: {
        businessName: req.body.businessName,
        subdomain: req.body.subdomain,
        planId: plan.id,
        status: "trial",
        trialEndsAt: new Date(Date.now() + 14 * 86400000),
        brandingSettings: {
          primaryColor: "#0F766E",
          secondaryColor: "#F59E0B",
          fontSelection: "Nunito",
        },
        contactEmail: req.body.contactEmail,
        contactPhone: req.body.contactPhone,
        address: req.body.address,
        schemaName,
      },
    });

    await bootstrapTenantSchema(prisma, schemaName);

    await prisma.subscription.create({
      data: {
        tenantId: tenant.id,
        planId: plan.id,
        status: "incomplete",
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 86400000),
        stripeSubscriptionId: `sub_${nanoid(18)}`,
        stripeCustomerId: `cus_${nanoid(18)}`,
      },
    });

    res.status(201).json(tenant);
  }),
);

platformRouter.get(
  "/tenants",
  requirePermission("view_tenants"),
  asyncHandler(async (req, res) => {
    const page = Number(req.query.page ?? 1);
    const pageSize = Number(req.query.pageSize ?? 20);

    const [total, items] = await Promise.all([
      prisma.tenant.count(),
      prisma.tenant.findMany({
        include: { plan: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
    ]);

    res.json({ total, page, pageSize, items });
  }),
);

platformRouter.get(
  "/tenants/:id",
  requirePermission("view_tenants"),
  asyncHandler(async (req, res) => {
    const tenant = await prisma.tenant.findUnique({
      where: { id: req.params.id },
      include: { plan: true, subscriptions: true, users: true },
    });

    if (!tenant) {
      throw new ApiError(404, "Tenant not found");
    }

    res.json(tenant);
  }),
);

platformRouter.put(
  "/tenants/:id",
  requirePermission("manage_all_tenants"),
  validate(platformTenantUpdateSchema),
  asyncHandler(async (req, res) => {
    const plan = req.body.planCode
      ? await prisma.plan.findUnique({ where: { code: req.body.planCode } })
      : null;

    if (req.body.planCode && !plan) {
      throw new ApiError(404, "Plan not found");
    }

    const updated = await prisma.tenant.update({
      where: { id: req.params.id },
      data: {
        status: req.body.status,
        customDomain: req.body.customDomain,
        planId: plan?.id,
      },
    });

    res.json(updated);
  }),
);

platformRouter.delete(
  "/tenants/:id",
  requirePermission("manage_all_tenants"),
  asyncHandler(async (req, res) => {
    await prisma.tenant.update({
      where: { id: req.params.id },
      data: { status: "cancelled" },
    });

    res.status(204).send();
  }),
);

platformRouter.get(
  "/stats",
  requirePermission("view_revenue"),
  asyncHandler(async (_req, res) => {
    const [totalTenants, activeSubscriptions, totalBookingsRows] = await Promise.all([
      prisma.tenant.count(),
      prisma.subscription.count({ where: { status: "active" } }),
      prisma.$queryRaw<Array<{ total: bigint | number }>>`SELECT COALESCE(COUNT(*),0) as total FROM platform.tenants`,
    ]);

    const plans = await prisma.plan.findMany();
    const tenants = await prisma.tenant.findMany({ include: { plan: true } });
    const mrr = tenants.reduce((acc, tenant) => acc + (tenant.plan.priceMonthly || 0), 0);

    res.json({
      totalTenants,
      activeSubscriptions,
      mrr,
      totalBookings: Number(totalBookingsRows[0]?.total ?? 0),
    });
  }),
);
