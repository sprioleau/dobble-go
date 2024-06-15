import styles from "./page.module.scss";

import LeaderboardScreen from "@/components/LeaderboardScreen";
import Logo from "@/components/Logo";
import OutlinedText from "@/components/OutlinedText";
import { db } from "@/db";
import { score } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export default async function LeaderboardPage() {
	const leaderboardEntries = await db.select().from(score).orderBy(desc(score.score)).limit(10);

	return (
		<main
			className={styles.main}
			data-background="yellow"
		>
			<Link
				href="/"
				className={styles["logo"]}
			>
				<Logo width={350} />
			</Link>
			<section>
				<h1 className={styles["title"]}>
					<OutlinedText>Leaderboard</OutlinedText>
				</h1>
				<LeaderboardScreen leaderboardEntries={leaderboardEntries} />
			</section>
			<div className={styles["spacer"]} />
		</main>
	);
}
