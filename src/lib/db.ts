import config from "@/lib/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as todosSchema from "@/lib//schema/todos";


export const pool = new Pool({
  connectionString: config.POSTGRES_URL,
});

export const db = drizzle(pool, { logger: true, schema: { ...todosSchema }},);
