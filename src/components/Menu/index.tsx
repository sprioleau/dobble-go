"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import useSound from "use-sound";

export default function Menu() {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const router = useRouter();
	const [difficulty, setDifficulty] = useState("beginner");
	const [playStartGameSound] = useSound("/sounds/start-game.mp3");

	function handleStartGame() {
		playStartGameSound();
		router.push("/play");
	}

	function handleOpenOptionsModal() {
		dialogRef.current?.showModal();
	}

	function handleCloseOptionsModal() {
		dialogRef.current?.close();
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		const difficulty = data.get("difficulty");
		router.push(`/play?difficulty=${difficulty}`);
	}

	function handleDifficultyChange(event: React.ChangeEvent<HTMLInputElement>) {
		setDifficulty(event.target.value);
	}

	return (
		<>
			<ul>
				<li>
					<button onClick={handleStartGame}>Start game</button>
				</li>
				<li>
					<button onClick={handleOpenOptionsModal}>Options</button>
				</li>
			</ul>

			<dialog ref={dialogRef}>
				<button onClick={handleCloseOptionsModal}>&times;</button>

				<form onSubmit={handleSubmit}>
					<h1>Options</h1>
					<fieldset>
						<legend>Options</legend>
						<input
							type="radio"
							id="difficulty-beginner"
							name="difficulty"
							value="beginner"
							checked={difficulty === "beginner"}
							onChange={handleDifficultyChange}
						/>
						<label htmlFor="difficulty-beginner">Beginner</label>
						<input
							type="radio"
							id="difficulty-intermediate"
							name="difficulty"
							value="intermediate"
							checked={difficulty === "intermediate"}
							onChange={handleDifficultyChange}
						/>
						<label htmlFor="difficulty-intermediate">Intermediate</label>
					</fieldset>
					<button>Save</button>
				</form>
			</dialog>
		</>
	);
}
