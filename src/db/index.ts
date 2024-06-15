import "../../envConfig";

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

export const dbCredentials = {
	url: process.env.DATABASE_URL!,
	authToken: process.env.DATABASE_AUTH_TOKEN!,
};

const client = createClient(dbCredentials);
export const db = drizzle(client, { schema });
