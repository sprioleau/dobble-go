import styles from "./index.module.scss";

import { GAME_OPTIONS } from "@/constants/gameOptions";
import useDifficulty from "@/hooks/useDifficulty";

type Props = {
	cardIndex: number;
	card: number[];
	onSelectSymbol: ({
		selectedCardIndex,
		selectedImageIndex,
	}: {
		selectedCardIndex: number;
		selectedImageIndex: number;
	}) => void;
	isMenuCard?: boolean;
};

export default function Card({ cardIndex, card, onSelectSymbol, isMenuCard = false }: Props) {
	const { difficulty } = useDifficulty();
	const { IMAGE_TRANSFORMS } = GAME_OPTIONS.DIFFICULTY[!isMenuCard ? difficulty : "INTERMEDIATE"];

	return (
		<div className={styles["card-container"]}>
			<ul
				className={styles["card"]}
				style={
					{
						"--card-rotation": (cardIndex % 2 === 0 ? -46 : 28) + "deg",
					} as React.CSSProperties
				}
			>
				{card.map((imageIndex, index) => {
					const { rotation, size, x, y } = IMAGE_TRANSFORMS[index];

					return (
						<li
							key={imageIndex}
							className={styles["symbol-image-container"]}
							style={
								{
									"--image-rotation": `${rotation}deg`,
									"--size": `${size}cqi`,
									"--x": `${x}cqi`,
									"--y": `${y}cqi`,
								} as React.CSSProperties
							}
						>
							<button
								className={styles["symbol-button"]}
								onClick={() => onSelectSymbol({ selectedCardIndex: cardIndex, selectedImageIndex: imageIndex })}
								style={
									{
										backgroundImage: `url("/images/symbols/${imageIndex + 1}.svg")`,
									} as React.CSSProperties
								}
							/>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
