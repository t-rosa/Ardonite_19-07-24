import { BOARD_COLS, BOARD_ROWS } from "./constants";

export const boardGrid = Array(BOARD_COLS)
	.fill(undefined)
	.flatMap((_, x) =>
		Array(BOARD_ROWS)
			.fill(undefined)
			.map((_, y) => [x, y]),
	);
