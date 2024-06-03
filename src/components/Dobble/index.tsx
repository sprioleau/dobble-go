/* eslint-disable @next/next/no-img-element */
"use client";

import styles from "./index.module.scss";

import Button from "@/components/Button";
import Card from "@/components/Card";
import OutlinedText from "@/components/OutlinedText";
import useSound from "@/hooks/useSound";
import generateDobble from "@/utils/generateDobble";
import { useEffect, useState } from "react";
import RadioGroup from "../RadioGroup";
import Image from "next/image";

function getDuplicateItems(array: number[]) {
	return array.filter((item, index) => array.indexOf(item) !== index);
}

type Props = {
	dobble: ReturnType<typeof generateDobble>;
};

export default function Dobble({ dobble: { deck: initialDeck, symbolsPerCard } }: Props) {
	const [deck, setDeck] = useState<ReturnType<typeof generateDobble>["deck"]>(initialDeck);
	const [score, setScore] = useState(0);

	// Sounds
	const {
		play: playGameMusic,
		stop: stopGameMusic,
		togglePlayPause: toggleGameMusic,
		playing: isGameMusicPlaying,
	} = useSound("/sounds/game-music.mp3", {
		autoplay: true,
		initialVolume: 0.5,
		loop: true,
	});
	const { play: playCorrectSound } = useSound("/sounds/correct.mp3");
	const { play: playIncorrectSound } = useSound("/sounds/incorrect.mp3");

	const displayedCardIndeces = Object.keys(deck).map(Number).slice(0, 2);

	useEffect(() => {
		playGameMusic();

		return () => {
			stopGameMusic();
		};
	}, [playGameMusic, stopGameMusic]);

	function restart() {
		setDeck(generateDobble({ symbolsPerCard }).deck);
		setScore(0);
	}

	const remainingCards = Object.keys(deck).length - displayedCardIndeces.length;

	if (displayedCardIndeces.length < 2) {
		return (
			<>
				<p>
					<OutlinedText>Finished!</OutlinedText>
				</p>
				<p>
					<OutlinedText>Score: {score}</OutlinedText>
				</p>
				<Button onClick={restart}>Restart</Button>
			</>
		);
	}
	const [correctImageIndex] = getDuplicateItems([...deck[displayedCardIndeces[0]], ...deck[displayedCardIndeces[1]]]);

	function handleClick({
		selectedCardIndex,
		selectedImageIndex,
	}: {
		selectedCardIndex: number;
		selectedImageIndex: number;
	}) {
		if (selectedImageIndex !== correctImageIndex) {
			playIncorrectSound();
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
					activeValue={isGameMusicPlaying ? "on" : "off"}
					onChange={() => toggleGameMusic()}
				/>
			</header>
			<ul className={styles["cards"]}>
				{displayedCardIndeces.map((cardIndex) => (
					<li key={cardIndex}>
						<Card
							cardIndex={cardIndex}
							card={deck[cardIndex]}
							symbolsPerCard={symbolsPerCard}
							onSelectSymbol={handleClick}
						/>
					</li>
				))}
			</ul>
			<p>
				<OutlinedText>Cards remaining: {remainingCards}</OutlinedText>
			</p>
		</>
	);
}
