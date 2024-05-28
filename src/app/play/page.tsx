import styles from "./page.module.scss";

import Dobble from "@/components/Dobble";
import { GAME_OPTIONS } from "@/constants/gameOptions";
import generateDobble from "@/utils/generateDobble";

type Props = {
	searchParams: {
		difficulty: string;
	};
};

export default function PlayPage({ searchParams }: Props) {
	// TODO: Parse search params or use client side only game
	const difficulty = (searchParams.difficulty || "beginner").toUpperCase() as keyof typeof GAME_OPTIONS.DIFFICULTY;
	const symbolsPerCard = GAME_OPTIONS.DIFFICULTY[difficulty].SYMBOLS_PER_CARD;

	const dobble = generateDobble({ symbolsPerCard });

	return (
		<main className={styles.main}>
			<Dobble dobble={dobble} />
		</main>
	);
}
