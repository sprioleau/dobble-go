import { z } from "zod";

export const scoreSchema = z.object({
	id: z.number(),
	name: z.string().trim().min(1, { message: "Name is required." }),
	score: z.string().trim().min(1, { message: "Score is required." }),
	createdAt: z.date(),
});

export const scoreFormDataSchema = scoreSchema.pick({
	name: true,
	score: true,
});

export const deleteScoreSchema = z.object({
	id: z.coerce.number(),
});
