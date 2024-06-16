"use server";

import { db } from "@/db";
import { scores } from "@/db/schema";
import { scoreFormDataSchema } from "@/lib/zod/schemas";
import getParsedFormData from "@/utils/getParsedFormData";
import { revalidatePath } from "next/cache";

export async function createScore(formData: FormData) {
	try {
		const parsedFormData = getParsedFormData({ formData, schema: scoreFormDataSchema });
		await db.insert(scores).values(parsedFormData);

		revalidatePath("/leaderboard");
		revalidatePath("/play");
	} catch (caughtError) {
		console.log("🔴 caughtError:", caughtError);

		// Reference: https://github.com/vercel/next.js/issues/49298#issuecomment-1542055642
		throw caughtError;

		/*
      TODO: Handle server action error
       - Use `error.ts`?
       - Consider using `useFormState`/`useActionState`
       // throw new Error("There was a problem saving your score.");
    */
	}
}
