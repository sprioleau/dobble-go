"use client";

import LeaderboardTable from "@/components/LeaderboardTable";
import useSound from "@/hooks/useSound";
import { useEffect } from "react";

export default function LeaderboardScreen() {
	const { play: playMenuMusic, stop: stopMenuMusic } = useSound("/sounds/menu-music.mp3");

	useEffect(() => {
		playMenuMusic();
		return () => stopMenuMusic();
	}, [playMenuMusic, stopMenuMusic]);

	return (
		<section>
			<LeaderboardTable />
		</section>
	);
}
