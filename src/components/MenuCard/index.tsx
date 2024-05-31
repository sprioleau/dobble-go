"use client";

import useSound from "@/hooks/useSound";
import styles from "./index.module.scss";

// prettier-ignore
const IMAGES = [
	{ index: 2 , rotation: -22  , size: 36 , x:  30 , y: -10 },
	{ index: 6 , rotation: -15  , size: 34 , x: -5  , y: -30 },
	{ index: 9 , rotation:  15  , size: 28 , x:  3  , y:  8  },
	{ index: 18, rotation: -5   , size: 40 , x: -30 , y:  0  },
	{ index: 37, rotation:  115 , size: 28 , x:  10 , y:  35 },
];

export default function MenuCard() {
	const { play: playLevelUpSound } = useSound("/sounds/level-up.mp3");

	return (
		<div className={styles["card-container"]}>
			<div className={styles["card"]}>
				{IMAGES.map(({ index, rotation, size, x, y }) => (
					<button
						key={index}
						onClick={() => playLevelUpSound()}
						className={styles["symbol-button"]}
						style={
							{
								"--image-rotation": `${rotation}deg`,
								"--size": `${size}cqi`,
								"--x": `${x}cqi`,
								"--y": `${y}cqi`,
								backgroundImage: `url("/images/symbols/${index}.svg")`,
							} as React.CSSProperties
						}
					/>
				))}
			</div>
		</div>
	);
}
