import { app } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./lib/prisma.js";
import { redis } from "./lib/redis.js";

async function bootstrap() {
  try {
    await prisma.$connect();
    await redis.ping();

    app.listen(env.PORT, () => {
      console.log(`LocalXplore API running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start API", error);
    process.exit(1);
  }
}

bootstrap();
