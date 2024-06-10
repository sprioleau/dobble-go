"use client";

import styles from "./index.module.scss";

import OutlinedText from "@/components/OutlinedText";
import RadioGroup from "@/components/RadioGroup";
import { GAME_OPTIONS } from "@/constants/gameOptions";
import useSound from "@/hooks/useSound";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type BackgroundColor = "orange" | "blue" | "pink";

export default function Menu() {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [difficulty, setDifficulty] = useState<keyof typeof GAME_OPTIONS.DIFFICULTY>("BEGINNER");
	const [backgroundColor, setBackgroundColor] = useState<BackgroundColor>("orange");

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

	function handleDifficultyChange(value: keyof typeof GAME_OPTIONS.DIFFICULTY) {
		playMenuNavigateSound();
		setDifficulty(value);
	}

	function handleBackgroundChange(value: BackgroundColor) {
		playMenuNavigateSound();
		setBackgroundColor(value);
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
							href={{
								pathname: "/play",
								query: {
									difficulty: difficulty.toLowerCase(),
									background: backgroundColor,
								},
							}}
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
							href={`/how-to-play`}
						>
							<OutlinedText>How to Play</OutlinedText>
						</Link>
					</li>
					<li
						className={styles["menu-item"]}
						onMouseEnter={() => playMenuNavigateSound()}
					>
						<Link href={`/leaderboard`}>
							<OutlinedText>Leaderboard</OutlinedText>
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

					<div className={styles["options"]}>
						<section>
							<OutlinedText fontSize={"1.75rem"}>Difficulty</OutlinedText>
							<RadioGroup<keyof typeof GAME_OPTIONS.DIFFICULTY>
								onChange={handleDifficultyChange}
								activeValue={difficulty}
								options={[
									{
										label: (
											<>
												<Image
													src="/images/difficulty-beginner.svg"
													alt="beginner difficulty icon"
													width={100}
													height={100}
												/>
											</>
										),
										value: "BEGINNER",
									},
									{
										label: (
											<>
												<Image
													src="/images/difficulty-intermediate.svg"
													alt="intermediate difficulty icon"
													width={100}
													height={100}
												/>
											</>
										),
										value: "INTERMEDIATE",
									},
								]}
							/>
						</section>

						<section>
							<OutlinedText fontSize={"1.75rem"}>Game Background</OutlinedText>
							<RadioGroup<BackgroundColor>
								onChange={handleBackgroundChange}
								activeValue={backgroundColor}
								options={[
									{
										label: (
											<div
												className={styles["background-option"]}
												data-color="orange"
											/>
										),
										value: "orange",
									},
									{
										label: (
											<div
												className={styles["background-option"]}
												data-color="blue"
											/>
										),
										value: "blue",
									},
									{
										label: (
											<div
												className={styles["background-option"]}
												data-color="pink"
											/>
										),
										value: "pink",
									},
								]}
							/>
						</section>
					</div>

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
