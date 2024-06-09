import styles from "./index.module.scss";

import OutlinedText from "../OutlinedText";
import Image from "next/image";

type Props = {
	remainingTime: {
		totalSeconds: number;
		isInFinalSeconds: boolean;
		isRunning: boolean;
	};
	remainingCards: number;
	score: number;
};

export default function GameInfoBar({
	remainingTime: { totalSeconds, isInFinalSeconds, isRunning },
	remainingCards,
	score,
}: Props) {
	return (
		<div className={styles["game-info-bar"]}>
			<div>
				<section
					className={styles["remaining-time"]}
					data-should-pulse={isInFinalSeconds ? "true" : "false"}
					data-is-paused={isRunning ? "false" : "true"}
				>
					<span>
						<Image
							src="/images/clock.svg"
							alt="clock"
							width={68}
							height={68}
						/>
					</span>
					<OutlinedText>{totalSeconds}</OutlinedText>
				</section>
				<section className={styles["remaining-cards"]}>
					<span>
						<Image
							src="/images/cards.svg"
							alt="cards"
							width={68}
							height={68}
						/>
					</span>
					<OutlinedText>{remainingCards}</OutlinedText>
				</section>
				<section className={styles["score"]}>
					<span>
						<Image
							src="/images/star.svg"
							alt="star"
							width={68}
							height={68}
						/>
					</span>
					<OutlinedText>{score}</OutlinedText>
				</section>
			</div>
		</div>
	);
}
