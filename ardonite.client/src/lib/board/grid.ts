import { GRID_COLS, GRID_ROWS } from "../constants";

export const grid = Array(GRID_COLS)
	.fill(undefined)
	.flatMap((_, x) =>
		Array(GRID_ROWS)
			.fill(undefined)
			.map((_, y) => [x, y]),
	);
