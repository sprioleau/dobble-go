import { z } from "zod";

export const scoreSchema = z.object({
	id: z.number(),
	name: z.string().trim().min(3, { message: "Name must be at least 3 characters." }),
	score: z.coerce.number(),
	createdAt: z.date(),
});

export const scoreFormDataSchema = scoreSchema.pick({
	name: true,
	score: true,
});

export const deleteScoreSchema = z.object({
	id: z.coerce.number(),
});
