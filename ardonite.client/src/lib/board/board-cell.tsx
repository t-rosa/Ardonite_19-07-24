import { PlayerMachineContext } from "@/lib/player/machine";
import { css } from "styled-system/css";

export function BoardCell(props: { x: number; y: number }) {
	const { x, y } = props;

	const actor = PlayerMachineContext.useActorRef();

	function handleClick() {
		actor.send({
			type: "player.move",
			destination: [x, y],
		});
	}

	return (
		<button
			type="button"
			onClick={handleClick}
			className={css({
				borderWidth: "thin",
				borderStyle: "dashed",
				cursor: "pointer",
				w: "var(--CELL_WIDTH)",
				h: "var(--CELL_HEIGHT)",
				position: "absolute",
			})}
			style={{
				top: `calc(${y} * var(--CELL_HEIGHT))`,
				left: `calc(${x} * var(--CELL_WIDTH))`,
			}}
		/>
	);
}
