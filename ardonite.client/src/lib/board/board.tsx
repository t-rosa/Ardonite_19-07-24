import { PlayerCell } from "@/lib/player/player-cell";
import * as React from "react";
import { css } from "styled-system/css";
import { BoardCell } from "./board-cell";
import { grid } from "./grid";

export function Board() {
	return (
		<section
			className={css({
				position: "relative",
				borderWidth: "1",
				w: "var(--GRID_WIDTH)",
				h: "var(--GRID_HEIGHT)",
			})}
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
