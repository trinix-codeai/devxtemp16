import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/errors.js";
import { prisma } from "../lib/prisma.js";
import { env } from "../config/env.js";

function detectSubdomain(host: string) {
  const [hostname] = host.split(":");
  if (!hostname) {
    return null;
  }

  const root = env.DEFAULT_TENANT_DOMAIN;
  if (hostname.endsWith(root)) {
    const sub = hostname.slice(0, hostname.length - root.length - 1);
    return sub || null;
  }

  const parts = hostname.split(".");
  if (parts.length >= 3) {
    return parts[0] ?? null;
  }

  return null;
}

export async function resolveTenant(req: Request, _res: Response, next: NextFunction) {
  const tenantHint =
    (req.headers["x-tenant-subdomain"] as string | undefined) ||
    (req.headers["x-tenant-id"] as string | undefined) ||
    detectSubdomain(req.headers.host ?? "");

  if (!tenantHint) {
    return next(new ApiError(400, "Tenant identifier missing"));
  }

  const tenant = await prisma.tenant.findFirst({
    where: {
      OR: [
        { id: tenantHint },
        { subdomain: tenantHint },
        { customDomain: req.headers.host?.split(":")[0] ?? undefined },
      ],
      status: { in: ["active", "trial"] },
    },
    include: { plan: true },
  });

  if (!tenant) {
    return next(new ApiError(404, "Tenant not found"));
  }

  req.tenant = {
    id: tenant.id,
    subdomain: tenant.subdomain,
    schemaName: tenant.schemaName,
    planCode: tenant.plan.code,
  };

  next();
}
