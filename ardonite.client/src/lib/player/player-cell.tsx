import {
	CELL_HEIGHT,
	CELL_WIDTH,
	PLAYER_HEIGHT,
	PLAYER_MOVE_SPEED,
	PLAYER_WIDTH,
} from "@/lib/constants";
import { PlayerMachineContext } from "@/lib/player/machine";

export function PlayerCell() {
	const ctx = PlayerMachineContext.useSelector((state) => state.context);

	return (
		<img
			alt="player"
			src={ctx.sprite}
			className="z-10"
			style={{
				position: "absolute",
				transform: ctx.facing === "left" ? "scaleX(-1)" : "scaleX(1)",
				transition: `left linear ${ctx.dx * PLAYER_MOVE_SPEED}ms , top linear ${ctx.dy * PLAYER_MOVE_SPEED}ms `,
				width: `${PLAYER_WIDTH}px`,
				height: `${PLAYER_HEIGHT}px`,
				top: `${ctx.coordinates[1] * CELL_HEIGHT + CELL_HEIGHT / 2 - PLAYER_HEIGHT / 2}px`,
				left: `${ctx.coordinates[0] * CELL_WIDTH + CELL_WIDTH / 2 - PLAYER_WIDTH / 2}px`,
			}}
		/>
	);
}
