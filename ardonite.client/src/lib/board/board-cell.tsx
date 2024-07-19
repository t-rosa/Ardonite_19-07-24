import { PlayerMachineContext } from "@/lib/player/machine";
import { css } from "styled-system/css";
import { GRID_COLS, GRID_ROWS } from "../constants";
import { MonsterMachineContext } from "../monster/machine";

export function BoardCell(props: { x: number; y: number }) {
	const { x, y } = props;

	const playerActor = PlayerMachineContext.useActorRef();
	const monsterCoordinate = MonsterMachineContext.useSelector(
		(state) => state.context.coordinates,
	);

	const isFighting = PlayerMachineContext.useSelector((state) =>
		state.matches("FIGHTING"),
	);

	function handleClick() {
		if (monsterCoordinate[0] === x && monsterCoordinate[1] === y) {
			playerActor.send({
				type: "player.fight",
			});
		}

		playerActor.send({
			type: "player.move",
			destination: [x, y],
		});
	}

	return (
		<button
			data-is-fighting={isFighting}
			type="button"
			onClick={handleClick}
			className={css({
				border: "1px dashed blue",
				borderBottomWidth: 0,
				cursor: "pointer",
				w: "var(--CELL_WIDTH)",
				h: "var(--CELL_HEIGHT)",
				position: "absolute",
				"&[data-is-fighting=true]": {
					borderColor: "red.500",
				},
			})}
			style={{
				borderRightWidth: x === GRID_COLS - 1 ? 1 : 0,
				borderBottomWidth: y === GRID_ROWS - 1 ? 1 : 0,
				top: `calc(${y} * var(--CELL_HEIGHT))`,
				left: `calc(${x} * var(--CELL_WIDTH))`,
			}}
		/>
	);
}
