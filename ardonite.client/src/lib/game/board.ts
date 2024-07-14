import { GRID_COLS, GRID_ROWS } from "../constants";

export const boardGrid = Array(GRID_COLS)
	.fill(undefined)
	.flatMap((_, x) =>
		Array(GRID_ROWS)
			.fill(undefined)
			.map((_, y) => [x, y]),
	);
