import styles from "./index.module.scss";

import Button from "../Button";
import OutlinedText from "../OutlinedText";
import { useState } from "react";

type Props = {
	hasWon: boolean;
	restart: () => void;
};

export default function GameEndedScreen({ hasWon, restart }: Props) {
	const [nameLetters, setNameLetters] = useState("");

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setNameLetters(event.target.value);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const name = formData.get("name") as string;
		console.log(name);

		// TODO: Implement server action
		// call server action
	}

	return (
		<div className={styles["game-ended-screen"]}>
			<p>
				<OutlinedText>{!hasWon ? "Time's up!" : "Finished!"}</OutlinedText>
			</p>
			{hasWon && (
				<form
					className={styles["name-form"]}
					onSubmit={handleSubmit}
				>
					<input
						type="text"
						name="name"
						onChange={handleChange}
						placeholder="Your name"
						value={nameLetters}
						className={styles["name-input"]}
						minLength={3}
						maxLength={8}
					/>
					<Button type="submit">Save</Button>
				</form>
			)}
			{!hasWon && <Button onClick={restart}>Restart</Button>}
		</div>
	);
}
