/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import styles from "./index.module.scss";

import Card from "@/components/Card";
import GameEndedScreen from "@/components/GameEndedScreen";
import GameTimer from "@/components/GameTimer";
import OutlinedText from "@/components/OutlinedText";
import RadioGroup from "@/components/RadioGroup";
import { GAME_OPTIONS } from "@/constants/gameOptions";
import useSound from "@/hooks/useSound";
import generateDobble from "@/utils/generateDobble";
import getDuplicateItems from "@/utils/getDuplicateItems";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

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

	useEffect(() => {
		if (gameMode === "PLAYING" && !isGameMusicPlaying) {
			playGameMusic();
		}

		if (gameMode === "ENDED" && !isGameEndedMusicPlaying) {
			playGameEndedMusic();
		}

		return () => {
			stopGameMusic();
			stopGameEndedMusic();
		};
	}, [gameMode]);

	function restart() {
		setDeck(generateDobble({ symbolsPerCard }).deck);
		setGameMode("PLAYING");
		stopGameEndedMusic();
		playGameMusic();
		setScore(0);
	}

	const displayedCardIndeces = Object.keys(deck).map(Number).slice(0, 2);
	const remainingCards = Object.keys(deck).length - displayedCardIndeces.length;

	const handleEndGame = useCallback(() => {
		setGameMode("ENDED");
		stopGameMusic();
		playGameEndedMusic();
	}, []);

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
			setScore((s) => Math.max(0, s - 1));
			return;
		}

		// If past this point, the user has found a match
		setScore((s) => s + 1);
		playCorrectSound();

		// Once match is found, get rid of the card that was clicked
		setDeck((previousDeck) => {
			delete previousDeck[selectedCardIndex];
			return previousDeck;
		});
	}

	return (
		<>
			<header className={styles["header"]}>
				<p>
					<OutlinedText>Score: {score}</OutlinedText>
				</p>
				<RadioGroup
					// prettier-ignore
					options={[
						{ label: <Image src="/images/sound-on.svg" alt="Sound on" width={48} height={48} />, value: "on", },
						{ label: <Image src="/images/sound-off.svg" alt="Sound off" width={48} height={48} />, value: "off", },
					]}
					activeValue={isGameMusicPlaying || isGameEndedMusicPlaying ? "on" : "off"}
					onChange={() => (gameMode === "PLAYING" ? toggleGameMusic() : toggleGameEndedMusic())}
				/>
			</header>
			{gameMode === "ENDED" ? (
				<GameEndedScreen restart={restart} />
			) : (
				<>
					<GameTimer
						secondsToExpire={GAME_OPTIONS.DIFFICULTY[difficulty].DURATION_SECONDS}
						onExpire={handleEndGame}
					/>
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
					<p>
						<OutlinedText>Cards remaining: {remainingCards}</OutlinedText>
					</p>
				</>
			)}
		</>
	);
}
