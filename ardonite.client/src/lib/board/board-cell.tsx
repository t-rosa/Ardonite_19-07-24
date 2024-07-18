import { PlayerMachineContext } from "@/lib/player/machine";
import { Effect } from "effect";
import { css } from "styled-system/css";

export function BoardCell(props: { x: number; y: number }) {
	const { x, y } = props;

	const actor = PlayerMachineContext.useActorRef();
	const [playerX, playerY] = PlayerMachineContext.useSelector(
		(state) => state.context.coordinates,
	);

	const handleClick = Effect.sync(() => {
		actor.send({
			type: "player.move",
			destination: [x, y],
		});
	});

	return (
		<button
			type="button"
			disabled={x === playerX && y === playerY}
			onClick={() => Effect.runSync(handleClick)}
			className={css({
				borderWidth: "1",
				cursor: "pointer",
				w: "var(--CELL_WIDTH)",
				h: "var(--CELL_HEIGHT)",
				position: "absolute",
				top: `calc(${y} * var(--CELL_HEIGHT))`,
				left: `calc(${x} * var(--CELL_WIDTH))`,
			})}
			style={{
				top: `calc(${y} * var(--CELL_HEIGHT))`,
				left: `calc(${x} * var(--CELL_WIDTH))`,
			}}
		/>
	);
}
