import { css } from "styled-system/css";
import { PlayerMachineContext } from "./machine";

export function PlayerCell() {
	const ctx = PlayerMachineContext.useSelector((state) => state.context);

	return (
		<div>
			<img
				alt="player"
				src={ctx.sprite}
				data-facing={ctx.facing}
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
					transition: `left linear calc(${ctx.xDelta} * var(--PLAYER_MOVE_SPEED)), top linear calc(${ctx.yDelta} * var(--PLAYER_MOVE_SPEED))`,
					top: `calc(${ctx.coordinates[1]} * var(--CELL_HEIGHT) + var(--CELL_HEIGHT) / 2 - var(--PLAYER_HEIGHT) / 2)`,
					left: `calc(${ctx.coordinates[0]} * var(--CELL_WIDTH) + var(--CELL_WIDTH) / 2 - var(--PLAYER_WIDTH) / 2)`,
				}}
			/>
		</div>
	);
}
