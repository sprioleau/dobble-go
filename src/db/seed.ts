import { db } from "@/db";
import { score } from "@/db/schema";

// prettier-ignore
const scores = [
  { id: 1, name: "Kira", score: 126, },
  { id: 2, name: "Femi", score: 119, },
  { id: 3, name: "Ada" , score: 88 , },
];

async function seed() {
	try {
		// Delete all existing score
		await db.delete(score);

		// Add new score
		await db.insert(score).values(scores);

		console.log("🌱 Successfully seeded database");
	} catch (caughtError) {
		console.log("❌ Something went wrong while attemptimg to seed database", caughtError);
	}
}

seed();
