"use client";

import { useState } from "react";
import { useTimer } from "react-timer-hook";

export default function useGameTimer({
	secondsToExpire,
	onExpire,
}: {
	secondsToExpire: number;
	onExpire?: () => void;
}) {
	const time = new Date();
	time.setSeconds(time.getSeconds() + secondsToExpire);

	const [isInFinalSeconds, setIsInFinalSeconds] = useState(false);

	const {
		totalSeconds,
		isRunning,
		start,
		pause,
		resume,
		restart: restartTimer,
	} = useTimer({
		expiryTimestamp: time,
		onExpire,
	});

	/* Pulse timer when either...
    - it's less than 10 seconds
    - it's less than 10% of the time remaining
    ...whichever is greater
  */
	const secondsToPulse = Math.max(Math.floor(0.1 * secondsToExpire), 10);

	if (isRunning && totalSeconds < secondsToPulse && !isInFinalSeconds) {
		setIsInFinalSeconds(true);
	}

	function restart() {
		const newTime = new Date();
		newTime.setSeconds(newTime.getSeconds() + secondsToExpire);
		restartTimer(newTime);
		setIsInFinalSeconds(false);
	}

	return {
		totalSeconds,
		isRunning,
		start,
		pause,
		resume,
		restart,
		isInFinalSeconds,
	};
}
