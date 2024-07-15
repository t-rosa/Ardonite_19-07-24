import { CELL_HEIGHT, CELL_WIDTH, PLAYER_MOVE_SPEED } from "@/lib/constants";
import { PlayerMachineContext } from "@/lib/player/machine";
import { useSelector } from "@xstate/react";

export function BoardCell(props: { x: number; y: number }) {
	const { x, y } = props;

	const actor = PlayerMachineContext.useActorRef();
	const player = useSelector(actor, (state) => state.context);

	async function moveX() {
		return new Promise((resolve) => {
			const dx = Math.abs(player.coordinates[0] - x);

			actor.send({
				type: "MOVE_X",
				x,
			});

			setTimeout(() => {
				resolve(true);
			}, dx * PLAYER_MOVE_SPEED);
		});
	}

	function moveY() {
		actor.send({
			type: "MOVE_Y",
			y,
		});
	}

	function handleClick() {
		moveX().then(moveY);
	}

	return (
		<button
			type="button"
			className="border grid place-items-center hover:bg-blue-500/20"
			disabled={x === player.coordinates[0] && y === player.coordinates[1]}
			style={{
				position: "absolute",
				width: `${CELL_WIDTH}px`,
				height: `${CELL_HEIGHT}px`,
				top: `${y * CELL_HEIGHT}px`,
				left: `${x * CELL_WIDTH}px`,
			}}
			onClick={handleClick}
		/>
	);
}
