import { css } from "styled-system/css";
import { usePlayerContext } from "./hooks/use-player-context";

export function PlayerCell() {
	const { sprite, facing, deltaX, deltaY, x, y } = usePlayerContext();

	return (
		<div>
			<img
				alt="player"
				src={sprite}
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
					transition: `left linear calc(${deltaX} * var(--PLAYER_MOVE_SPEED)), top linear calc(${deltaY} * var(--PLAYER_MOVE_SPEED))`,
					top: `calc(${y} * var(--CELL_HEIGHT) + var(--CELL_HEIGHT) / 2 - var(--PLAYER_HEIGHT) / 2)`,
					left: `calc(${x} * var(--CELL_WIDTH) + var(--CELL_WIDTH) / 2 - var(--PLAYER_WIDTH) / 2)`,
				}}
			/>
		</div>
	);
}
