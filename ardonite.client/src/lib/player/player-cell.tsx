import {
	CELL_HEIGHT,
	CELL_WIDTH,
	PLAYER_HEIGHT,
	PLAYER_MOVE_SPEED,
	PLAYER_WIDTH,
} from "@/lib/constants";
import { PlayerMachineContext } from "@/lib/player/machine";
import { useSelector } from "@xstate/react";

export function PlayerCell() {
	const actor = PlayerMachineContext.useActorRef();
	const player = useSelector(actor, (state) => state.context);

	return (
		<img
			alt="player"
			src={player.sprite}
			className="z-10"
			style={{
				position: "absolute",
				transform: player.facing === "left" ? "scaleX(-1)" : "scaleX(1)",
				transition: `left linear ${player.dx * PLAYER_MOVE_SPEED}ms , top linear ${player.dy * PLAYER_MOVE_SPEED}ms `,
				width: `${PLAYER_WIDTH}px`,
				height: `${PLAYER_HEIGHT}px`,
				top: `${player.coordinates[1] * CELL_HEIGHT + CELL_HEIGHT / 2 - PLAYER_HEIGHT / 2}px`,
				left: `${player.coordinates[0] * CELL_WIDTH + CELL_WIDTH / 2 - PLAYER_WIDTH / 2}px`,
			}}
		/>
	);
}
