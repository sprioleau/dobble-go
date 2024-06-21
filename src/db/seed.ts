import { db } from "@/db";
import { scores } from "@/db/schema";

// prettier-ignore
const seededScores = [
  { id: 1, name: "Kira", score: 44, },
  { id: 2, name: "Femi", score: 38, },
  { id: 3, name: "Ada" , score: 36 , },
];

async function seed() {
	try {
		// Delete all existing score
		await db.delete(scores);

		// Add new score
		await db.insert(scores).values(seededScores);

		console.log("🌱 Successfully seeded database");
	} catch (caughtError) {
		console.log("❌ Something went wrong while attemptimg to seed database", caughtError);
	}
}

seed();
