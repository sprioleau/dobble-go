import { generate, getTotalSymbolCount } from "dobble";

export default function generateDobble({
	numberOfSymbols,
	shouldValidateResult = true,
}: {
	numberOfSymbols: number;
	shouldValidateResult?: boolean;
}) {
	const deck = generate(numberOfSymbols, shouldValidateResult)
		.sort(() => Math.random() - 0.5)
		.reduce<Record<number, number[]>>((acc, card, index) => {
			acc[index] = card;
			return acc;
		}, {});

	return {
		deck,
		totalSymbolCount: getTotalSymbolCount(numberOfSymbols),
	};
}
