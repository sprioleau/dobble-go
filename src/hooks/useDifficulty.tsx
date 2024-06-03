"use client";

import { GAME_OPTIONS } from "@/constants/gameOptions";
import { useSearchParams } from "next/navigation";

export default function useDifficulty() {
	const searchParams = useSearchParams();
	const difficulty = (
		searchParams.get("difficulty") || "beginner"
	).toUpperCase() as keyof typeof GAME_OPTIONS.DIFFICULTY;

	return { difficulty };
}
