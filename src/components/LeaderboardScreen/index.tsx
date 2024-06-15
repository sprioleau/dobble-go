"use client";

import LeaderboardTable from "@/components/LeaderboardTable";
import { Score } from "@/db/types";
import useSound from "@/hooks/useSound";
import { useEffect } from "react";

type Props = {
	leaderboardEntries: Score[];
};

export default function LeaderboardScreen({ leaderboardEntries }: Props) {
	const { play: playMenuMusic, stop: stopMenuMusic } = useSound("/sounds/menu-music.mp3");

	useEffect(() => {
		playMenuMusic();
		return () => stopMenuMusic();
	}, [playMenuMusic, stopMenuMusic]);

	return (
		<section>
			<LeaderboardTable leaderboardEntries={leaderboardEntries} />
		</section>
	);
}
