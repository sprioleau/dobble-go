import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const score = sqliteTable("score", {
	id: integer("id").primaryKey().notNull(),
	name: text("name").notNull(),
	score: integer("score").notNull(),
	createdAt: integer("timestamp2", { mode: "timestamp_ms" })
		.notNull()
		.default(sql`(unixepoch() * 1000)`),
});
