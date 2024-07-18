import { PlayerMachineContext } from "@/lib/player/machine";
import { css } from "styled-system/css";

export function PlayerCell() {
	const ctx = PlayerMachineContext.useSelector((state) => state.context);

	return (
		<img
			alt="player"
			src={ctx.sprite}
			data-x={ctx.coordinates[0]}
			data-y={ctx.coordinates[1]}
			className={css({
				position: "absolute",
				zIndex: "10",
				w: "var(--PLAYER_WIDTH)",
				h: "var(--PLAYER_HEIGHT)",
			})}
			style={{
				transform: ctx.facing === "left" ? "scaleX(-1)" : "scaleX(1)",
				transition: `left linear calc(${ctx.xDelta} * var(--PLAYER_MOVE_SPEED)), top linear calc(${ctx.yDelta} * var(--PLAYER_MOVE_SPEED))`,
				top: `calc(${ctx.coordinates[1]} * var(--CELL_HEIGHT) + var(--CELL_HEIGHT) / 2 - var(--PLAYER_HEIGHT) / 2)`,
				left: `calc(${ctx.coordinates[0]} * var(--CELL_WIDTH) + var(--CELL_WIDTH) / 2 - var(--PLAYER_WIDTH) / 2)`,
			}}
		/>
	);
}
