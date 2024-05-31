import styles from "./page.module.scss";

import BackToMenuPageLink from "@/components/BackToMenuPageLink";

export default function LeaderboardPage() {
	return (
		<main
			className={styles.main}
			data-background="yellow"
		>
			<h1 className="text-outlined">Leaderboard</h1>
			<BackToMenuPageLink />
		</main>
	);
}
