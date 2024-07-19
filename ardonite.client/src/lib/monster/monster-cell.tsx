import { css } from "styled-system/css";
import { MonsterMachineContext } from "./machine";

export function MonsterCell() {
	const ctx = MonsterMachineContext.useSelector((state) => state.context);

	return (
		<img
			alt="monster"
			src={ctx.sprite}
			data-facing={ctx.facing}
			className={css({
				position: "absolute",
				w: "var(--PLAYER_WIDTH)",
				h: "var(--PLAYER_HEIGHT)",
				"&[data-facing='left']": {
					transform: "scaleX(-1)",
				},
			})}
			style={{
				left: `calc(${ctx.coordinates[0]} * var(--CELL_WIDTH) + var(--CELL_WIDTH) / 2 - var(--PLAYER_WIDTH) / 2)`,
				top: `calc(${ctx.coordinates[1]} * var(--CELL_HEIGHT) + var(--CELL_HEIGHT) / 2 - var(--PLAYER_HEIGHT) / 2)`,
			}}
		/>
	);
}
