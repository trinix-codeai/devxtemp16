import { Router } from "express";
import { asyncHandler } from "../../middleware/async-handler.js";
import { prisma } from "../../lib/prisma.js";
import { redis } from "../../lib/redis.js";

export const healthRouter = Router();

healthRouter.get(
  "/",
  asyncHandler(async (_req, res) => {
    const [db, cache] = await Promise.all([
      prisma.$queryRaw<Array<{ result: number }>>`SELECT 1 as result`,
      redis.ping(),
    ]);

    res.json({
      status: "ok",
      database: db[0]?.result === 1 ? "up" : "down",
      redis: cache === "PONG" ? "up" : "down",
      timestamp: new Date().toISOString(),
    });
  }),
);
