import { generate, getTotalSymbolCount } from "dobble";

export default function generateDobble({
	symbolsPerCard,
	shouldValidateResult = true,
}: {
	symbolsPerCard: number;
	shouldValidateResult?: boolean;
}) {
	const deck = generate(symbolsPerCard, shouldValidateResult)
		.sort(() => Math.random() - 0.5)
		.reduce<Record<number, number[]>>((acc, card, index) => {
			acc[index] = card;
			return acc;
		}, {});

	return {
		deck,
		symbolsPerCard,
		totalSymbolCount: getTotalSymbolCount(symbolsPerCard),
	};
}
