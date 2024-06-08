import styles from "./index.module.scss";

import OutlinedText from "../OutlinedText";
import Image from "next/image";

type Props = {
	remainingTime: {
		minutes: number;
		seconds: number;
		isInFinalSeconds: boolean;
		isRunning: boolean;
	};
	remainingCards: number;
	score: number;
};

export default function GameInfoBar({
	remainingTime: { seconds, minutes, isInFinalSeconds, isRunning },
	remainingCards,
	score,
}: Props) {
	return (
		<div className={styles["game-info-bar"]}>
			<div>
				<section className={styles["remaining-time"]}>
					<span>
						<Image
							src="/images/clock.svg"
							alt="clock"
							width={68}
							height={68}
						/>
					</span>
					<OutlinedText>
						<span
							className={styles["timer"]}
							data-should-pulse={isInFinalSeconds ? "true" : "false"}
							data-is-paused={isRunning ? "false" : "true"}
						>
							<span>{`${String(minutes).padStart(2, "0")}`}</span>
							<span>:</span>
							<span>{`${String(seconds).padStart(2, "0")}`}</span>
						</span>
					</OutlinedText>
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
