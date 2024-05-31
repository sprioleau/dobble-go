import styles from "./index.module.scss";

import Image from "next/image";

const IMAGE_ANGLES = [-22, 54, 189, -120];
const IMAGE_SCALES = [0.7, 0.85, 1, 1.1];

type Props = {
	cardIndex: number;
	card: number[];
	symbolsPerCard: number;
	onSelectSymbol: ({
		selectedCardIndex,
		selectedImageIndex,
	}: {
		selectedCardIndex: number;
		selectedImageIndex: number;
	}) => void;
};

export default function Card({ cardIndex, card, symbolsPerCard, onSelectSymbol }: Props) {
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
				{card.map((imageIndex, rotationIndex) => {
					return (
						<li
							key={imageIndex}
							className={styles["symbol-image-container"]}
							style={
								{
									"--offset-angle": rotationIndex * (360 / symbolsPerCard) + "deg",
								} as React.CSSProperties
							}
						>
							<button
								className={styles["symbol-button"]}
								onClick={() => onSelectSymbol({ selectedCardIndex: cardIndex, selectedImageIndex: imageIndex })}
								style={
									{
										"--image-rotation": `${IMAGE_ANGLES[(imageIndex + 1) % IMAGE_ANGLES.length]}deg`,
										"--image-scale": `${IMAGE_SCALES[(imageIndex + 1) % IMAGE_SCALES.length]}`,
									} as React.CSSProperties
								}
							>
								<Image
									src={`/images/symbols/${imageIndex + 1}.svg`}
									alt="emoji"
									draggable={false}
									width={100}
									height={100}
								/>
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
