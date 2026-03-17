import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { bootstrapTenantSchema } from "../src/lib/tenant-schema.js";

const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS platform`);
  await prisma.$executeRawUnsafe(`SET search_path TO platform`);

  const starter = await prisma.plan.upsert({
    where: { code: "starter" },
    update: {},
    create: {
      name: "Starter",
      code: "starter",
      description: "For small operators",
      priceMonthly: 49,
      priceAnnual: 490,
      commissionRate: 5,
      features: ["branded_website", "up_to_20_listings", "booking_management", "basic_reports", "email_support"],
      limits: { users: 2, listings: 20, bookingsPerMonth: 100, storageGb: 5 },
      sortOrder: 1,
    },
  });

  const growth = await prisma.plan.upsert({
    where: { code: "growth" },
    update: {},
    create: {
      name: "Growth",
      code: "growth",
      description: "For scaling travel businesses",
      priceMonthly: 99,
      priceAnnual: 990,
      commissionRate: 3,
      features: ["starter_features", "unlimited_listings", "agent_portal", "marketing_tools", "api_access", "priority_support"],
      limits: { users: 10, listings: "unlimited", bookingsPerMonth: 1000, storageGb: 20 },
      sortOrder: 2,
    },
  });

  await prisma.plan.upsert({
    where: { code: "enterprise" },
    update: {},
    create: {
      name: "Enterprise",
      code: "enterprise",
      description: "For multi-location operations",
      priceMonthly: 299,
      priceAnnual: 2990,
      commissionRate: 1,
      features: ["growth_features", "multi_location", "dedicated_account_manager", "custom_integrations", "sla_guarantee", "white_glove_onboarding"],
      limits: { users: "unlimited", listings: "unlimited", bookingsPerMonth: "unlimited", storageGb: 100 },
      sortOrder: 3,
    },
  });

  const tenant = await prisma.tenant.upsert({
    where: { subdomain: "demo" },
    update: {},
    create: {
      businessName: "Demo Adventures",
      subdomain: "demo",
      planId: growth.id,
      status: "active",
      brandingSettings: {
        primaryColor: "#0F766E",
        secondaryColor: "#F59E0B",
        logoUrl: "",
        aboutText: "Demo tenant for LocalXplore",
      },
      contactEmail: "owner@demo.local",
      contactPhone: "+1-555-000-9999",
      address: "123 Demo Street, Coastal City",
      schemaName: "tenant_demo",
    },
  });

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: "sub_demo_growth" },
    update: {},
    create: {
      tenantId: tenant.id,
      planId: growth.id,
      status: "active",
      currentPeriodStart: new Date(),
      currentPeriodEnd: new Date(Date.now() + 30 * 86400000),
      stripeSubscriptionId: "sub_demo_growth",
      stripeCustomerId: "cus_demo_growth",
    },
  });

  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);
  await prisma.tenantUser.upsert({
    where: { tenantId_email: { tenantId: tenant.id, email: "owner@demo.local" } },
    update: {},
    create: {
      tenantId: tenant.id,
      email: "owner@demo.local",
      passwordHash,
      firstName: "Demo",
      lastName: "Owner",
      role: "owner",
      permissions: ["full_tenant_access", "manage_staff", "configure_branding", "view_financials"],
    },
  });

  await bootstrapTenantSchema(prisma, tenant.schemaName);
  console.log("Seed completed. Demo login: owner@demo.local / ChangeMe123!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
