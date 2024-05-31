import OutlinedText from "@/components/OutlinedText";
import styles from "./page.module.scss";

import BackToMenuPageLink from "@/components/BackToMenuPageLink";

export default function LeaderboardPage() {
	return (
		<main
			className={styles.main}
			data-background="yellow"
		>
			<h1>
				<OutlinedText>Leaderboard</OutlinedText>
			</h1>
			<BackToMenuPageLink />
		</main>
	);
}
