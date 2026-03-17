import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { asyncHandler } from "../../middleware/async-handler.js";
import { validate } from "../../middleware/validate.js";
import { ApiError } from "../../lib/errors.js";
import { prisma } from "../../lib/prisma.js";
import { signAccessToken } from "../../lib/jwt.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  tenantSubdomain: z.string().optional(),
});

export const authRouter = Router();

authRouter.post(
  "/login",
  validate(loginSchema),
  asyncHandler(async (req, res) => {
    const { email, password, tenantSubdomain } = req.body;

    const user = await prisma.tenantUser.findFirst({
      where: {
        email,
        tenant: tenantSubdomain ? { subdomain: tenantSubdomain } : undefined,
      },
      include: {
        tenant: {
          include: {
            plan: true,
          },
        },
      },
    });

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new ApiError(401, "Invalid credentials");
    }

    await prisma.tenantUser.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const accessToken = signAccessToken({
      userId: user.id,
      tenantId: user.tenantId,
      role: user.role,
      permissions: user.permissions as string[],
    });

    res.json({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      tenant: {
        id: user.tenant.id,
        businessName: user.tenant.businessName,
        subdomain: user.tenant.subdomain,
        plan: user.tenant.plan.code,
      },
    });
  }),
);
