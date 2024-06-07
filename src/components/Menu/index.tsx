"use client";

import styles from "./index.module.scss";

import OutlinedText from "@/components/OutlinedText";
import useSound from "@/hooks/useSound";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import RadioGroup from "@/components/RadioGroup";

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

	function handleDifficultyChange(value: string) {
		setDifficulty(value);
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
						<Link href={`/leaderboard`}>
							<OutlinedText>Leaderboard</OutlinedText>
						</Link>
					</li>
					<li
						className={styles["menu-item"]}
						onMouseEnter={() => playMenuNavigateSound()}
					>
						<Link
							onClick={handleStartGame}
							href={`/how-to-play`}
						>
							<OutlinedText>How to Play</OutlinedText>
						</Link>
					</li>
				</ul>
			</nav>

			<dialog
				ref={dialogRef}
				className={styles["options-modal"]}
			>
				<div className={styles["options-modal-wrapper"]}>
					<h1>
						<OutlinedText>Options</OutlinedText>
					</h1>

					<section>
						<h2>Difficulty</h2>
						<RadioGroup
							onChange={handleDifficultyChange}
							activeValue={difficulty}
							options={[
								{ label: "Beginner", value: "beginner" },
								{
									label: <span>Inter&shy;mediate</span>,
									value: "intermediate",
								},
							]}
						/>
					</section>

					<button
						className={styles["close-button"]}
						onClick={handleCloseOptionsModal}
					>
						&times;
					</button>
				</div>
			</dialog>
		</>
	);
}
