import { boardGrid } from "./lib/game/board";
import {
	BOARD_CELL_HEIGHT,
	BOARD_CELL_WIDTH,
	BOARD_COLS,
	BOARD_ROWS,
} from "./lib/game/constants";
import type { Position } from "./lib/game/types";

export function App() {
	return (
		<main className="h-dvh grid place-items-center">
			<Board />
		</main>
	);
}

function Board() {
	return (
		<section
			className="border relative"
			style={{
				width: `${BOARD_COLS * BOARD_CELL_WIDTH}px`,
				height: `${BOARD_ROWS * BOARD_CELL_HEIGHT}px`,
			}}
		>
			{boardGrid.map(([x, y]) => (
				<BoardCell key={`${x}${y}`} x={x} y={y} />
			))}
		</section>
	);
}

function BoardCell(props: Position) {
	return (
		<div
			className="border grid place-items-center"
			style={{
				position: "absolute",
				width: `${BOARD_CELL_WIDTH}px`,
				height: `${BOARD_CELL_HEIGHT}px`,
				top: `${props.y * BOARD_CELL_HEIGHT}px`,
				left: `${props.x * BOARD_CELL_WIDTH}px`,
			}}
		>
			{props.x}:{props.y}
		</div>
	);
}
