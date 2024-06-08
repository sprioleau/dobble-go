/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import styles from "./index.module.scss";

import Card from "@/components/Card";
import GameEndedScreen from "@/components/GameEndedScreen";
import RadioGroup from "@/components/RadioGroup";
import SoundOff from "@/components/SoundOff";
import SoundOn from "@/components/SoundOn";
import { GAME_OPTIONS } from "@/constants/gameOptions";
import useSound from "@/hooks/useSound";
import generateDobble from "@/utils/generateDobble";
import getDuplicateItems from "@/utils/getDuplicateItems";
import { useCallback, useEffect, useState } from "react";
import Logo from "@/components/Logo";
import useGameTimer from "@/hooks/useGameTimer";
import GameInfoBar from "../GameInfoBar";

type GameMode = "PLAYING" | "ENDED";

type Props = {
	dobble: ReturnType<typeof generateDobble>;
	difficulty: keyof typeof GAME_OPTIONS.DIFFICULTY;
};

export default function Dobble({ dobble: { deck: initialDeck, symbolsPerCard }, difficulty }: Props) {
	const [deck, setDeck] = useState<ReturnType<typeof generateDobble>["deck"]>(initialDeck);
	const [score, setScore] = useState(0);
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
		togglePlayPause: toggleGameEndedMusic,
		playing: isGameEndedMusicPlaying,
	} = useSound("/sounds/game-ended.mp3", {
		initialVolume: 0.5,
		loop: true,
		autoplay: false,
	});
	const { play: playCorrectSound } = useSound("/sounds/correct.mp3");
	const { play: playIncorrectSound } = useSound("/sounds/incorrect.mp3");

	const handleEndGame = useCallback(() => {
		setGameMode("ENDED");
		stopGameMusic();
		playGameEndedMusic();
	}, []);

	// Game Timer
	const {
		seconds,
		minutes,
		isRunning,
		isInFinalSeconds,
		restart: restartTimer,
	} = useGameTimer({
		secondsToExpire: GAME_OPTIONS.DIFFICULTY[difficulty].DURATION_SECONDS,
		// onExpire: handleEndGame,
	});

	useEffect(() => {
		if (gameMode === "PLAYING" && !isGameMusicPlaying && isGameEndedMusicPlaying) {
			playGameMusic();
		}

		if (gameMode === "ENDED" && isGameMusicPlaying && !isGameEndedMusicPlaying) {
			playGameEndedMusic();
		}

		return () => {
			stopGameMusic();
			stopGameEndedMusic();
		};
	}, [gameMode]);

	function restart() {
		const time = new Date();
		time.setSeconds(time.getSeconds() + GAME_OPTIONS.DIFFICULTY[difficulty].DURATION_SECONDS);
		restartTimer(time);

		setDeck(generateDobble({ symbolsPerCard }).deck);
		setGameMode("PLAYING");
		stopGameEndedMusic();
		playGameMusic();
		setScore(0);
	}

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

	return (
		<>
			<header className={styles["header"]}>
				<Logo width={350} />
				<RadioGroup
					// prettier-ignore
					options={[
						{ label: <SoundOn />, value: "on", },
						{ label: <SoundOff />, value: "off", },
					]}
					activeValue={isGameMusicPlaying || isGameEndedMusicPlaying ? "on" : "off"}
					onChange={() => (gameMode === "PLAYING" ? toggleGameMusic() : toggleGameEndedMusic())}
				/>
			</header>
			{gameMode === "ENDED" ? (
				<GameEndedScreen restart={restart} />
			) : (
				<>
					<ul className={styles["cards"]}>
						{displayedCardIndeces.map((cardIndex) => (
							<li key={cardIndex}>
								<Card
									cardIndex={cardIndex}
									card={deck[cardIndex]}
									onSelectSymbol={handleClick}
								/>
							</li>
						))}
					</ul>
					<footer>
						<GameInfoBar
							remainingTime={{
								seconds,
								minutes,
								isRunning,
								isInFinalSeconds,
							}}
							remainingCards={remainingCards}
							score={score}
						/>
					</footer>
				</>
			)}
		</>
	);
}
