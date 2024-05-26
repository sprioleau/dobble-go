/* eslint-disable @next/next/no-img-element */
"use client";

import generateDobble from "@/utils/generateDobble";
import { useState } from "react";

function getDuplicateItems(array: number[]) {
	return array.filter((item, index) => array.indexOf(item) !== index);
}

const SYMBOLS_PER_CARD = 6;

const IMAGE_ANGLES = [-22, 54, 189, -120];
const IMAGE_SCALES = [0.8, 0.9, 1, 1.2];

export default function Dobble() {
	const [deck, setDeck] = useState<ReturnType<typeof generateDobble>["deck"]>(
		generateDobble({ numberOfSymbols: SYMBOLS_PER_CARD }).deck
	);
	const [score, setScore] = useState(0);
	const displayedCardIndeces = Object.keys(deck).map(Number).slice(0, 2);

	function restart() {
		setDeck(generateDobble({ numberOfSymbols: SYMBOLS_PER_CARD }).deck);
		setScore(0);
	}

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
		console.log("clicked");
		if (selectedImageIndex !== correctImageIndex) return;

		// If past this point, the user has found a match
		setScore((s) => s + 1);

		// Once match is found, get rid of the card that was clicked
		setDeck((previousDeck) => {
			delete previousDeck[selectedCardIndex];
			return previousDeck;
		});
	}

	return (
		<>
			<p>Score: {score}</p>
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
										className="emoji-container"
										style={
											{
												"--offset-angle": rotationIndex * (360 / SYMBOLS_PER_CARD) + "deg",
											} as React.CSSProperties
										}
									>
										<img
											className="emoji"
											src={`/images/stickers/Emoji_${String(imageIndex + 1).padStart(2, "0")}.svg`}
											alt="emoji"
											onClick={() => handleClick({ selectedCardIndex: cardIndex, selectedImageIndex: imageIndex })}
											style={
												{
													"--image-rotation": `${IMAGE_ANGLES[(imageIndex + 1) % IMAGE_ANGLES.length]}deg`,
													"--image-scale": `${IMAGE_SCALES[(imageIndex + 1) % IMAGE_SCALES.length]}`,
												} as React.CSSProperties
											}
										/>
									</li>
								);
							})}
						</ul>
					</li>
				))}
			</ul>
		</>
	);
}
