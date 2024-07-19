import { PlayerCell } from "@/lib/player/player-cell";
import { css } from "styled-system/css";
import { MonsterCell } from "../monster/monster-cell";
import { BoardCell } from "./board-cell";
import { grid } from "./grid";

export function Board() {
	return (
		<section
			className={css({
				position: "relative",
				borderWidth: "1",
				borderStyle: "dashed",
				w: "var(--GRID_WIDTH)",
				h: "var(--GRID_HEIGHT)",
			})}
		>
			<PlayerCell />
			<MonsterCell />
			{grid.map(([x, y]) => (
				<BoardCell key={`${x}${y}`} x={x} y={y} />
			))}
		</section>
	);
}
