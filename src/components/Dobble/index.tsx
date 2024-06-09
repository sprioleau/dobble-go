/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import styles from "./index.module.scss";

import Card from "@/components/Card";
import GameActionButtons from "@/components/GameActionButtons";
import GameEndedScreen from "@/components/GameEndedScreen";
import GameInfoBar from "@/components/GameInfoBar";
import Logo from "@/components/Logo";
import OutlinedText from "@/components/OutlinedText";
import { GAME_OPTIONS } from "@/constants/gameOptions";
import useGameTimer from "@/hooks/useGameTimer";
import useSound from "@/hooks/useSound";
import generateDobble from "@/utils/generateDobble";
import getDuplicateItems from "@/utils/getDuplicateItems";
import Link from "next/link";
import { useEffect, useState } from "react";

type GameMode = "PLAYING" | "PAUSED" | "ENDED";

type Props = {
	dobble: ReturnType<typeof generateDobble>;
	difficulty: keyof typeof GAME_OPTIONS.DIFFICULTY;
};

export default function Dobble({ dobble: { deck: initialDeck, symbolsPerCard }, difficulty }: Props) {
	const [deck, setDeck] = useState<ReturnType<typeof generateDobble>["deck"]>(initialDeck);
	const [score, setScore] = useState(0);
	const [shouldRotateCards, setShouldRotateCards] = useState(true);
	const [gameMode, setGameMode] = useState<GameMode>("PLAYING");

	// Sounds
	const {
		play: playGameMusic,
		stop: stopGameMusic,
		togglePlayPause: toggleGameMusic,
		playing: isGameMusicPlaying,
	} = useSound("/sounds/game-music.mp3", {
		initialVolume: 0.5,
		loop: true,
		autoplay: false,
	});
	const {
		play: playGameEndedMusic,
		stop: stopGameEndedMusic,
		playing: isGameEndedMusicPlaying,
	} = useSound("/sounds/game-ended.mp3", {
		initialVolume: 0.5,
		loop: true,
		autoplay: false,
	});
	const { play: playCorrectSound } = useSound("/sounds/correct.mp3");
	const { play: playIncorrectSound } = useSound("/sounds/incorrect.mp3");

	// Game Timer
	const {
		seconds,
		minutes,
		isRunning: isTimerRunning,
		isInFinalSeconds,
		start: startTimer,
		pause: pauseTimer,
		restart: restartTimer,
	} = useGameTimer({
		secondsToExpire: GAME_OPTIONS.DIFFICULTY[difficulty].DURATION_SECONDS,
		onExpire: handleEndGame,
	});

	useEffect(() => {
		if (gameMode === "PLAYING") {
			if (!isGameMusicPlaying && isGameEndedMusicPlaying) playGameMusic();
			if (!isTimerRunning) startTimer();
		}

		if (gameMode === "PAUSED") {
			if (!isGameMusicPlaying && isGameEndedMusicPlaying) playGameMusic();
			if (isTimerRunning) pauseTimer();
		}

		if (gameMode === "ENDED") {
			if (isGameMusicPlaying && !isGameEndedMusicPlaying) playGameEndedMusic();
			if (isTimerRunning) pauseTimer();
		}

		return () => {
			stopGameMusic();
			stopGameEndedMusic();
		};
	}, [gameMode]);

	const displayedCardIndeces = Object.keys(deck).map(Number).slice(0, 2);
	const remainingCards = Object.keys(deck).length - displayedCardIndeces.length;

	useEffect(() => {
		if (remainingCards === 0) {
			setGameMode("ENDED");
			handleEndGame();
		}
	}, [remainingCards]);

	function handleClick({
		selectedCardIndex,
		selectedImageIndex,
	}: {
		selectedCardIndex: number;
		selectedImageIndex: number;
	}) {
		if (gameMode === "ENDED") return;

		const [correctImageIndex] = getDuplicateItems([...deck[displayedCardIndeces[0]], ...deck[displayedCardIndeces[1]]]);

		if (selectedImageIndex !== correctImageIndex) {
			playIncorrectSound();

			if (GAME_OPTIONS.DIFFICULTY[difficulty].PENALIZE_INCORRECT) {
				setScore((s) => Math.max(0, s - 1));
			}

			return;
		}

		// If past this point, the user has found a match
		setScore((s) => s + 1);
		playCorrectSound();

		// Once match is found, get rid of the card that was clickedz
		setDeck((previousDeck) => {
			delete previousDeck[selectedCardIndex];
			return previousDeck;
		});
	}

	function handleEndGame() {
		setGameMode("ENDED");
	}

	function handleRestartGame() {
		// Setup new game timer
		const time = new Date();
		time.setSeconds(time.getSeconds() + GAME_OPTIONS.DIFFICULTY[difficulty].DURATION_SECONDS);
		restartTimer(time);

		setDeck(generateDobble({ symbolsPerCard }).deck);
		setGameMode("PLAYING");
		stopGameEndedMusic();
		playGameMusic();
		setScore(0);
	}

	function handleTogglePlayPause() {
		setGameMode((previousGameMode) => (previousGameMode === "PLAYING" ? "PAUSED" : "PLAYING"));
	}

	function handleToggleShouldRotateCards() {
		setShouldRotateCards((previousShouldRotateCards) => !previousShouldRotateCards);
	}

	const isSoundOn = isGameMusicPlaying || isGameEndedMusicPlaying;

	return (
		<div className={styles["dobble"]}>
			<header className={styles["header"]}>
				<Link href="/">
					<Logo width={350} />
				</Link>
			</header>
			{gameMode === "PLAYING" && (
				<ul className={styles["cards"]}>
					{displayedCardIndeces.map((cardIndex) => (
						<li key={cardIndex}>
							<Card
								cardIndex={cardIndex}
								card={deck[cardIndex]}
								onSelectSymbol={handleClick}
								shouldRotate={shouldRotateCards}
							/>
						</li>
					))}
				</ul>
			)}
			{gameMode === "PAUSED" && <OutlinedText>Paused</OutlinedText>}
			{gameMode === "ENDED" && <GameEndedScreen restart={handleRestartGame} />}
			<aside className={styles["game-action-buttons"]}>
				<GameActionButtons
					isPaused={!isTimerRunning}
					isSoundOn={isSoundOn}
					isCardRotationOn={shouldRotateCards}
					onTogglePlayPause={handleTogglePlayPause}
					onToggleSoundOnOff={toggleGameMusic}
					onToggleCardRotationOnOff={handleToggleShouldRotateCards}
				/>
			</aside>
			<footer className={styles["game-info-bar"]}>
				<GameInfoBar
					remainingTime={{
						seconds,
						minutes,
						isRunning: isTimerRunning,
						isInFinalSeconds,
					}}
					remainingCards={remainingCards}
					score={score}
				/>
			</footer>
		</div>
	);
}
