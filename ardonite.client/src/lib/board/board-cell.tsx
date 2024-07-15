import { CELL_HEIGHT, CELL_WIDTH, PLAYER_MOVE_SPEED } from "@/lib/constants";
import { PlayerMachineContext } from "@/lib/player/machine";

export function BoardCell(props: { x: number; y: number }) {
	const { x, y } = props;

	const actor = PlayerMachineContext.useActorRef();
	const [playerX, playerY] = PlayerMachineContext.useSelector(
		(state) => state.context.coordinates,
	);

	async function moveX() {
		return new Promise((resolve) => {
			const dx = Math.abs(playerX - x);

			actor.send({
				type: "player.move.x",
				x,
			});

			setTimeout(() => {
				resolve(true);
			}, dx * PLAYER_MOVE_SPEED);
		});
	}

	function moveY() {
		actor.send({
			type: "player.move.y",
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
			disabled={x === playerX && y === playerY}
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
