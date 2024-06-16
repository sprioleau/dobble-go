import styles from "./index.module.scss";

import Button from "../Button";
import OutlinedText from "../OutlinedText";
import { createScore } from "@/actions";
import Link from "next/link";

type Props = {
	hasWon: boolean;
	score: number;
	restart: () => void;
};

export default function GameEndedScreen({ hasWon, score, restart }: Props) {
	return (
		<div className={styles["game-ended-screen"]}>
			<p>
				<OutlinedText>{!hasWon ? "Time's up!" : "Finished!"}</OutlinedText>
			</p>
			{hasWon && (
				<form
					action={createScore}
					className={styles["name-form"]}
				>
					<input
						type="text"
						name="name"
						placeholder="Your name"
						className={styles["name-input"]}
						minLength={3}
						maxLength={8}
					/>
					<input
						type="text"
						name="score"
						aria-hidden
						hidden
						value={score}
						readOnly
					/>
					<Button type="submit">Save</Button>
				</form>
			)}
			<Link href="/leaderboard">Leaderboard</Link>

			{!hasWon && <Button onClick={restart}>Restart</Button>}
		</div>
	);
}
