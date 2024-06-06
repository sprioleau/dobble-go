"use client";

import styles from "./index.module.scss";

import { useTimer } from "react-timer-hook";
import OutlinedText from "../OutlinedText";
import { useState } from "react";

type Props = {
	secondsToExpire: number;
	onExpire?: () => void;
};

export default function GameTimer({ secondsToExpire, onExpire }: Props) {
	const time = new Date();
	time.setSeconds(time.getSeconds() + secondsToExpire);

	const [isInFinalSeconds, setIsInFinalSeconds] = useState(false);

	const { seconds, minutes, isRunning, start, pause, resume, restart } = useTimer({
		expiryTimestamp: time,
		onExpire,
	});

	/* Pulse timer when either...
		- it's less than 10 seconds
		- it's less than 10% of the time remaining
		...whichever is greater
	*/
	const secondsToPulse = Math.max(Math.floor(0.1 * secondsToExpire), 10);

	if (isRunning && minutes === 0 && seconds < secondsToPulse && !isInFinalSeconds) {
		setIsInFinalSeconds(true);
	}

	return (
		<OutlinedText>
			<span
				className={styles["timer"]}
				data-should-pulse={isInFinalSeconds ? "true" : "false"}
				data-is-paused={isRunning ? "false" : "true"}
			>
				{`${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`}
			</span>
		</OutlinedText>
	);
}
