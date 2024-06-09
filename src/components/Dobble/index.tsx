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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type GameMode = "PLAYING" | "PAUSED" | "ENDED";

type Props = {
	dobble: ReturnType<typeof generateDobble>;
	difficulty: keyof typeof GAME_OPTIONS.DIFFICULTY;
};

export default function Dobble({ dobble: { deck: initialDeck, symbolsPerCard }, difficulty }: Props) {
	const [deck, setDeck] = useState<ReturnType<typeof generateDobble>["deck"]>(initialDeck);
	const [card1Index, setCard1Index] = useState(0);
	const [card2Index, setCard2Index] = useState(1);
	const [score, setScore] = useState(0);
	const [shouldRotateCards, setShouldRotateCards] = useState(true);
	const [gameMode, setGameMode] = useState<GameMode>("PLAYING");
	const router = useRouter();

	// Sounds
	const {
		play: playGameMusic,
		stop: stopGameMusic,
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

	// Game Mode Listener
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

	const displayedCardIndeces = [card1Index, card2Index];
	const remainingCards = Object.keys(deck).length - displayedCardIndeces.length;
	const isSoundOn = isGameMusicPlaying || isGameEndedMusicPlaying;

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

		const [correctImageIndex] = getDuplicateItems([...deck[card1Index], ...deck[card2Index]]);

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

		// Once match is found, get rid of the card that was clicked
		setDeck((previousDeck) => {
			delete previousDeck[selectedCardIndex];

			// Get the index of the next available card
			const nextAvailableCardIndex = Number(
				Object.keys(previousDeck).filter((cardIndex) => ![card1Index, card2Index].includes(Number(cardIndex)))[0]
			);

			// Change out the card on which the symbol was selected
			if (selectedCardIndex === card1Index) {
				setCard1Index(nextAvailableCardIndex);
			} else if (selectedCardIndex === card2Index) {
				setCard2Index(nextAvailableCardIndex);
			}

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

	function handleToggleSoundOnOff() {
		if (isSoundOn) {
			// Mute all music
			stopGameMusic();
			stopGameEndedMusic();
			return;
		}

		if (!isGameMusicPlaying && gameMode === "PLAYING") {
			playGameMusic();
		}

		if (!isGameEndedMusicPlaying && gameMode === "ENDED") {
			playGameEndedMusic();
		}
	}

	function handleToggleShouldRotateCards() {
		setShouldRotateCards((previousShouldRotateCards) => !previousShouldRotateCards);
	}

	return (
		<div className={styles["dobble"]}>
			<header className={styles["header"]}>
				<Link
					href="/"
					className={styles["back-to-menu-link"]}
				>
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
			{gameMode === "ENDED" && (
				<GameEndedScreen
					shouldDisplayTimeExpiredMessage={totalSeconds <= 0}
					restart={handleRestartGame}
				/>
			)}
			<aside className={styles["game-action-buttons"]}>
				<GameActionButtons
					isPaused={!isTimerRunning}
					isSoundOn={isSoundOn}
					isCardRotationOn={shouldRotateCards}
					onTogglePlayPause={handleTogglePlayPause}
					onToggleSoundOnOff={handleToggleSoundOnOff}
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
