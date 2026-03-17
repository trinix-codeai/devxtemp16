import { Pool } from "pg";
import { env } from "../config/env.js";

const pool = new Pool({ connectionString: env.DATABASE_URL });

export type QueryResultRow = Record<string, unknown>;

export async function tenantQuery<T extends QueryResultRow = QueryResultRow>(
  schemaName: string,
  sql: string,
  params: unknown[] = [],
) {
  if (!/^[a-z0-9_]+$/.test(schemaName)) {
    throw new Error("Invalid schema name");
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(`SET LOCAL search_path TO ${schemaName}`);
    const result = await client.query<T>(sql, params);
    await client.query("COMMIT");
    return result.rows;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function tenantExecute(schemaName: string, sql: string, params: unknown[] = []) {
  await tenantQuery(schemaName, sql, params);
}
