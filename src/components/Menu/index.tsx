"use client";

import styles from "./index.module.scss";

import OutlinedText from "@/components/OutlinedText";
import useSound from "@/hooks/useSound";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Menu() {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const router = useRouter();
	const [difficulty, setDifficulty] = useState("beginner");

	// Sounds
	const { play: playStartGameSound } = useSound("/sounds/start-game.mp3");
	const { play: playMenuNavigateSound } = useSound("/sounds/menu-navigate.mp3");
	const { play: playMenuMusic, stop: stopMenuMusic } = useSound("/sounds/menu-music.mp3");

	useEffect(() => {
		playMenuMusic();
		return () => stopMenuMusic();
	}, [playMenuMusic, stopMenuMusic]);

	function handleStartGame() {
		playStartGameSound();
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
			<nav>
				<ul className={styles["menu-items"]}>
					<li
						className={styles["menu-item"]}
						onMouseEnter={() => playMenuNavigateSound()}
					>
						<Link
							onClick={handleStartGame}
							autoFocus
							href={`/play?difficulty=${difficulty}`}
						>
							<OutlinedText>Start</OutlinedText>
						</Link>
					</li>
					<li
						className={styles["menu-item"]}
						onMouseEnter={() => playMenuNavigateSound()}
					>
						<button onClick={handleOpenOptionsModal}>
							<OutlinedText>Options</OutlinedText>
						</button>
					</li>
					<li
						className={styles["menu-item"]}
						onMouseEnter={() => playMenuNavigateSound()}
					>
						<Link
							onClick={handleStartGame}
							autoFocus
							href={`/leaderboard`}
						>
							<OutlinedText>Leaderboard</OutlinedText>
						</Link>
					</li>
				</ul>
			</nav>

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
