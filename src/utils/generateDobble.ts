import { generate, getTotalSymbolCount } from "dobble";

const TOTAL_SYMBOLS = 100;

export default function generateDobble({
	symbolsPerCard,
	shouldValidateResult = true,
}: {
	symbolsPerCard: number;
	shouldValidateResult?: boolean;
}) {
	const randomOffset = Math.floor(Math.random() * TOTAL_SYMBOLS);
	// prettier-ignore
	const deck = generate(symbolsPerCard, shouldValidateResult)
		.sort(() => Math.random() - 0.5)
		.reduce<Record<number, number[]>>((acc, card, index) => {
			acc[index] = card
				.sort(() => Math.random() - 0.5)
				.map((symbolIndex) => (symbolIndex + randomOffset) % TOTAL_SYMBOLS);
			return acc;
		}, {});

	return {
		deck,
		symbolsPerCard,
		totalSymbolCount: getTotalSymbolCount(symbolsPerCard),
	};
}
