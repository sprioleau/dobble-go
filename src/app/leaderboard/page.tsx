import styles from "./page.module.scss";

import BackToMenuPageLink from "@/components/BackToMenuPageLink";
import LeaderboardScreen from "@/components/LeaderboardScreen";
import OutlinedText from "@/components/OutlinedText";

export default function LeaderboardPage() {
	return (
		<main
			className={styles.main}
			data-background="yellow"
		>
			<h1>
				<OutlinedText>Leaderboard</OutlinedText>
			</h1>
			<LeaderboardScreen />
			<BackToMenuPageLink />
		</main>
	);
}
