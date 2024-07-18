import { css } from "styled-system/css";
import { usePlayer } from "./hooks/use-player-context";

export function PlayerCell() {
	const { isMoving, facing, xDelta, yDelta, x, y } = usePlayer();

	return (
		<div>
			<img
				alt="player"
				src={isMoving ? "walk.gif" : "idle.gif"}
				data-facing={facing}
				className={css({
					position: "absolute",
					zIndex: "10",
					w: "var(--PLAYER_WIDTH)",
					h: "var(--PLAYER_HEIGHT)",
					"&[data-facing='left']": {
						transform: "scaleX(-1)",
					},
					"&[data-facing='right']": {
						transform: "scaleX(1)",
					},
				})}
				style={{
					transition: `left linear calc(${xDelta} * var(--PLAYER_MOVE_SPEED)), top linear calc(${yDelta} * var(--PLAYER_MOVE_SPEED))`,
					top: `calc(${y} * var(--CELL_HEIGHT) + var(--CELL_HEIGHT) / 2 - var(--PLAYER_HEIGHT) / 2)`,
					left: `calc(${x} * var(--CELL_WIDTH) + var(--CELL_WIDTH) / 2 - var(--PLAYER_WIDTH) / 2)`,
				}}
			/>
		</div>
	);
}
