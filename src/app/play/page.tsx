import styles from "./page.module.scss";

import Dobble from "@/components/Dobble";
import { BackgroundColor } from "@/components/Menu";
import { GAME_OPTIONS } from "@/constants/gameOptions";
import generateDobble from "@/utils/generateDobble";

export const dynamic = "force-dynamic";

type Props = {
	searchParams: {
		difficulty: string;
		background: string;
	};
};

export default function PlayPage({ searchParams }: Props) {
	// TODO: Parse search params or use client side only game
	const difficulty = (searchParams.difficulty || "beginner").toUpperCase() as keyof typeof GAME_OPTIONS.DIFFICULTY;
	const backgroundColor = (searchParams.background || "orange") as BackgroundColor;
	const symbolsPerCard = GAME_OPTIONS.DIFFICULTY[difficulty].SYMBOLS_PER_CARD;

	const dobble = generateDobble({ symbolsPerCard });

	return (
		<main
			className={styles.main}
			data-background={backgroundColor}
		>
			<Dobble
				dobble={dobble}
				difficulty={difficulty}
			/>
		</main>
	);
}
