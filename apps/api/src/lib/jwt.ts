import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

type AccessPayload = {
  userId: string;
  tenantId?: string;
  role: string;
  permissions: string[];
};

export function signAccessToken(payload: AccessPayload) {
  return jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"] });
}

export function verifyAccessToken(token: string): AccessPayload {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessPayload;
}
