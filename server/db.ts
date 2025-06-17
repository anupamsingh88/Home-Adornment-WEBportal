import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg"; // ✅ From pg, not Neon
import { drizzle } from "drizzle-orm/node-postgres"; // ✅ Correct driver for local pg
import * as schema from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set. Did you forget to provision a database?");
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
