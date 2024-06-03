"use client";

import Card from "../Card";

import useSound from "@/hooks/useSound";

export default function MenuCard() {
	const { play: playLevelUpSound } = useSound("/sounds/level-up.mp3");

	return (
		<Card
			cardIndex={0}
			card={[1, 2, 6, 9, 18, 37]}
			onSelectSymbol={() => playLevelUpSound()}
			isMenuCard
		/>
	);
}
