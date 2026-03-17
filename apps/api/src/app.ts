import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";
import { authRouter } from "./modules/auth/routes.js";
import { platformRouter } from "./modules/platform/routes.js";
import { tenantRouter } from "./modules/tenant/routes.js";
import { publicRouter } from "./modules/public/routes.js";
import { healthRouter } from "./modules/health/routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.WEB_URL, credentials: true }));
app.use(express.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(morgan(env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/", (_req, res) => {
  res.json({
    name: "LocalXplore API",
    version: "1.0.0",
    docs: "/docs/api.md",
  });
});

app.use("/api/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/platform", platformRouter);
app.use("/api/tenant", tenantRouter);
app.use("/api/public", publicRouter);

app.use(notFoundHandler);
app.use(errorHandler);
