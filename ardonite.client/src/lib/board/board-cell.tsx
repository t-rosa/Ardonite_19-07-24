import { CELL_HEIGHT, CELL_WIDTH } from "@/lib/constants";
import { PlayerMachineContext } from "@/lib/player/machine";
import { css } from "styled-system/css";

export function BoardCell(props: { x: number; y: number }) {
	const { x, y } = props;

	const actor = PlayerMachineContext.useActorRef();
	const [playerX, playerY] = PlayerMachineContext.useSelector(
		(state) => state.context.coordinates,
	);

	function handleClick() {
		actor.send({
			type: "player.move",
			destination: [x, y],
		});
	}

	return (
		<button
			type="button"
			className={css({
				borderWidth: "1",
				cursor: "pointer",
			})}
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
