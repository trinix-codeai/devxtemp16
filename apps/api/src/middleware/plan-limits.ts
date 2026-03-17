import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/errors.js";
import { tenantQuery } from "../lib/tenant-db.js";

const limitsByPlan = {
  starter: { listings: 20, bookingsPerMonth: 100 },
  growth: { listings: Infinity, bookingsPerMonth: 1000 },
  enterprise: { listings: Infinity, bookingsPerMonth: Infinity },
};

export function enforceListingLimit(req: Request, _res: Response, next: NextFunction) {
  const tenant = req.tenant;
  if (!tenant) {
    return next(new ApiError(500, "Tenant context missing"));
  }

  const limits = limitsByPlan[tenant.planCode as keyof typeof limitsByPlan];
  if (!limits || limits.listings === Infinity) {
    return next();
  }

  tenantQuery<{ count: number }>(tenant.schemaName, "SELECT COUNT(*)::int as count FROM listings")
    .then((rows) => {
      const count = rows[0]?.count ?? 0;
      if (count >= limits.listings) {
        return next(new ApiError(402, `Plan limit reached. Max listings: ${limits.listings}`));
      }
      return next();
    })
    .catch(next);
}

export function enforceBookingLimit(req: Request, _res: Response, next: NextFunction) {
  const tenant = req.tenant;
  if (!tenant) {
    return next(new ApiError(500, "Tenant context missing"));
  }

  const limits = limitsByPlan[tenant.planCode as keyof typeof limitsByPlan];
  if (!limits || limits.bookingsPerMonth === Infinity) {
    return next();
  }

  tenantQuery<{ count: number }>(
    tenant.schemaName,
    `SELECT COUNT(*)::int as count FROM bookings WHERE DATE_TRUNC('month', created_at) = DATE_TRUNC('month', NOW())`,
  )
    .then((rows) => {
      const count = rows[0]?.count ?? 0;
      if (count >= limits.bookingsPerMonth) {
        return next(new ApiError(402, `Plan limit reached. Max monthly bookings: ${limits.bookingsPerMonth}`));
      }
      return next();
    })
    .catch(next);
}
