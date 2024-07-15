import { CELL_HEIGHT, CELL_WIDTH, GRID_COLS, GRID_ROWS } from "@/lib/constants";
import { PlayerCell } from "@/lib/player/player-cell";
import * as React from "react";
import { BoardCell } from "./board-cell";
import { grid } from "./grid";

export function Board() {
	return (
		<section
			className="border relative "
			style={{
				width: `${GRID_COLS * CELL_WIDTH}px`,
				height: `${GRID_ROWS * CELL_HEIGHT}px`,
			}}
		>
			{grid.map(([x, y]) => (
				<React.Fragment key={`${x}${y}`}>
					<PlayerCell />
					<BoardCell key={`${x}${y}`} x={x} y={y} />
				</React.Fragment>
			))}
		</section>
	);
}
