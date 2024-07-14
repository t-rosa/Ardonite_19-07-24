import {
	CELL_HEIGHT,
	CELL_WIDTH,
	GRID_COLS,
	GRID_ROWS,
	PLAYER_HEIGHT,
	PLAYER_MOVE_DELAY,
	PLAYER_WIDTH,
} from "@/lib/constants";
import { boardGrid } from "@/lib/game/board";
import { PlayerMachineContext } from "@/lib/player/machine";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useSelector } from "@xstate/react";
import * as React from "react";

export const Route = createLazyFileRoute("/game")({
	component: Page,
});

function Page() {
	const player = PlayerMachineContext.useActorRef();
	const currentState = useSelector(player, (state) => state.value);

	return (
		<main className="h-dvh">
			<div className="grid place-items-center p-9">
				<div className="px-6 py-3 border border-dashed">
					{currentState.toString()}
				</div>
			</div>
			<div className="grid place-items-center">
				<Grid />
			</div>
		</main>
	);
}

function Grid() {
	return (
		<section
			className="border relative "
			style={{
				width: `${GRID_COLS * CELL_WIDTH}px`,
				height: `${GRID_ROWS * CELL_HEIGHT}px`,
			}}
		>
			{boardGrid.map(([x, y]) => (
				<React.Fragment key={`${x}${y}`}>
					<PlayerCell />
					<GridCell key={`${x}${y}`} x={x} y={y} />
				</React.Fragment>
			))}
		</section>
	);
}

function GridCell(props: { x: number; y: number }) {
	const { x, y } = props;

	const player = PlayerMachineContext.useActorRef();
	const state = useSelector(player, (state) => state);

	function handleClick() {
		const left = state.context.coordinates[0] > x;

		if (
			state.context.coordinates[0] !== x ||
			state.context.coordinates[1] !== y
		) {
			if (left) {
				player.send({ type: "MOVE_LEFT", coordinates: [x, y] });
			} else {
				player.send({ type: "MOVE_RIGHT", coordinates: [x, y] });
			}
		}
	}

	return (
		<button
			type="button"
			className="border grid place-items-center hover:bg-blue-500/20 "
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

function PlayerCell() {
	const player = PlayerMachineContext.useActorRef();
	const [x, y] = useSelector(player, (state) => state.context.coordinates);
	const state = useSelector(player, (state) => state);

	return (
		<img
			alt=""
			src={state.context.sprite}
			style={{
				transform: state.value === "MOVING_RIGHT" ? "scaleX(1)" : "scaleX(-1)",
				position: "absolute",
				transition: `left ${PLAYER_MOVE_DELAY}ms, top ${PLAYER_MOVE_DELAY}ms `,
				width: `${PLAYER_WIDTH}px`,
				height: `${PLAYER_HEIGHT}px`,
				top: `${y * CELL_HEIGHT + CELL_HEIGHT / 2 - PLAYER_HEIGHT / 2}px`,
				left: `${x * CELL_WIDTH + CELL_WIDTH / 2 - PLAYER_WIDTH / 2}px`,
			}}
		/>
	);
}
