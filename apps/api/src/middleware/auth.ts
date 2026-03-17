import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../lib/errors.js";
import { verifyAccessToken } from "../lib/jwt.js";

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const raw = req.headers.authorization;
  if (!raw?.startsWith("Bearer ")) {
    return next(new ApiError(401, "Missing bearer token"));
  }

  const token = raw.replace("Bearer ", "").trim();
  try {
    req.auth = verifyAccessToken(token);
    next();
  } catch {
    next(new ApiError(401, "Invalid access token"));
  }
}

export function requirePermission(permission: string) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const permissions = req.auth?.permissions ?? [];
    if (!permissions.includes(permission) && !permissions.includes("full_tenant_access") && req.auth?.role !== "super_admin") {
      return next(new ApiError(403, `Missing permission: ${permission}`));
    }

    next();
  };
}
