import fs from "node:fs/promises";
import path from "node:path";
import type { PrismaClient } from "@prisma/client";

const templateSqlPath = path.resolve(process.cwd(), "prisma", "tenant-template.sql");

export async function bootstrapTenantSchema(prisma: PrismaClient, schemaName: string) {
  if (!/^[a-z0-9_]+$/.test(schemaName)) {
    throw new Error("Invalid schema name");
  }

  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS ${schemaName}`);

  const sql = await fs.readFile(templateSqlPath, "utf-8");
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(`SET search_path TO ${schemaName}; ${statement};`);
  }
}
