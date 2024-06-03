// prettier-ignore
export const GAME_OPTIONS = {
	DIFFICULTY: {
		BEGINNER: {
			SYMBOLS_PER_CARD: 4,
			IMAGE_TRANSFORMS: [
				{ rotation: -22 , size: 40, x:  28 , y:  20 },
				{ rotation: -15 , size: 40, x: -25 , y: -20 },
				{ rotation:  15 , size: 40, x:  16 , y: -21 },
				{ rotation: -5  , size: 45, x: -15 , y:  24 },
			],
		},
		INTERMEDIATE: {
			SYMBOLS_PER_CARD: 6,
			IMAGE_TRANSFORMS: [
				{ rotation: -22 , size: 36, x:  30, y: -15 },
				{ rotation: -15 , size: 38, x: -5 , y: -34 },
				{ rotation:  15 , size: 28, x:  1 , y:  0  },
				{ rotation: -5  , size: 40, x: -33, y: -5  },
				{ rotation:  115, size: 33, x:  20, y:  25 },
				{ rotation:  220, size: 34, x: -15, y:  30 },
			],
		},
	},
} as const;
