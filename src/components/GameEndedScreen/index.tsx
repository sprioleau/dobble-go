import styles from "./index.module.scss";

import { createScore } from "@/actions";
import Button from "../Button";
import OutlinedText from "../OutlinedText";

type Props = {
	hasWon: boolean;
	score: number;
	restart: () => void;
};

export default function GameEndedScreen({ hasWon, score, restart }: Props) {
	return (
		<div className={styles["game-ended-screen"]}>
			<p>
				{/* TODO: Make save name form a modal dialog? */}
				<OutlinedText>{!hasWon ? "Time's up!" : `You win! Score: ${score}`}</OutlinedText>
			</p>
			{hasWon && (
				<form
					action={createScore}
					className={styles["name-form"]}
				>
					<input
						type="text"
						name="name"
						placeholder="Name"
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
			<Button onClick={restart}>Restart</Button>
		</div>
	);
}
