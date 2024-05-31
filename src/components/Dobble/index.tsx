/* eslint-disable @next/next/no-img-element */
"use client";

import useSound from "@/hooks/useSound";
import generateDobble from "@/utils/generateDobble";
import { useEffect, useState } from "react";

function getDuplicateItems(array: number[]) {
	return array.filter((item, index) => array.indexOf(item) !== index);
}

const IMAGE_ANGLES = [-22, 54, 189, -120];
const IMAGE_SCALES = [0.7, 0.85, 1, 1.1];

type Props = {
	dobble: ReturnType<typeof generateDobble>;
};

export default function Dobble({ dobble: { deck: initialDeck, symbolsPerCard } }: Props) {
	const [deck, setDeck] = useState<ReturnType<typeof generateDobble>["deck"]>(initialDeck);
	const [score, setScore] = useState(0);
	const [isGameMusicPlaying, setIsGameMusicPlaying] = useState(true);

	// Sounds
	const {
		play: playGameMusic,
		stop: stopGameMusic,
		pause: pauseGameMusic,
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
				<p>You&apos;ve finsished the round</p>
				<p>Score: {score}</p>
				<button onClick={restart}>Restart</button>
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

	function handleToggleGameMusic() {
		if (isGameMusicPlaying) {
			pauseGameMusic();
			setIsGameMusicPlaying(false);
		} else {
			playGameMusic();
			setIsGameMusicPlaying(true);
		}
	}

	return (
		<>
			<p>Score: {score}</p>
			<button onClick={handleToggleGameMusic}>{isGameMusicPlaying ? "Pause music" : "Play music"}</button>
			<ul className="deck">
				{displayedCardIndeces.map((cardIndex) => (
					<li key={cardIndex}>
						<ul
							className="card"
							style={
								{
									"--card-rotation": (cardIndex % 2 === 0 ? -46 : 28) + "deg",
								} as React.CSSProperties
							}
						>
							{deck[cardIndex].map((imageIndex, rotationIndex) => {
								return (
									<li
										key={imageIndex}
										className="symbol-image-container"
										style={
											{
												"--offset-angle": rotationIndex * (360 / symbolsPerCard) + "deg",
											} as React.CSSProperties
										}
									>
										<button
											className="symbol-button"
											onClick={() => handleClick({ selectedCardIndex: cardIndex, selectedImageIndex: imageIndex })}
											style={
												{
													"--image-rotation": `${IMAGE_ANGLES[(imageIndex + 1) % IMAGE_ANGLES.length]}deg`,
													"--image-scale": `${IMAGE_SCALES[(imageIndex + 1) % IMAGE_SCALES.length]}`,
												} as React.CSSProperties
											}
										>
											<img
												src={`/images/symbols/${imageIndex + 1}.svg`}
												alt="emoji"
												draggable={false}
											/>
										</button>
									</li>
								);
							})}
						</ul>
					</li>
				))}
			</ul>
			<p>Cards remaining: {remainingCards}</p>
		</>
	);
}
