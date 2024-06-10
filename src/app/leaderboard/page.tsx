import styles from "./page.module.scss";

import LeaderboardScreen from "@/components/LeaderboardScreen";
import Logo from "@/components/Logo";
import OutlinedText from "@/components/OutlinedText";
import Link from "next/link";

export default function LeaderboardPage() {
	return (
		<main
			className={styles.main}
			data-background="yellow"
		>
			<Link href="/">
				<Logo width={350} />
			</Link>
			<section>
				<h1>
					<OutlinedText>Leaderboard</OutlinedText>
				</h1>
				<LeaderboardScreen />
			</section>
			<div className={styles["spacer"]} />
		</main>
	);
}
