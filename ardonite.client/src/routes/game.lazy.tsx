import { CELL_HEIGHT, CELL_WIDTH, GRID_COLS, GRID_ROWS } from "@/lib/constants";
import { boardGrid } from "@/lib/game/board";
import { PlayerMachineContext } from "@/lib/player/machine";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useSelector } from "@xstate/react";

export const Route = createLazyFileRoute("/game")({
	component: Page,
});

function Page() {
	return (
		<main className="h-dvh grid place-items-center">
			<EventsButton />
			<Board />
		</main>
	);
}

function EventsButton() {
	const player = PlayerMachineContext.useActorRef();
	const state = useSelector(player, (state) => state);

	return (
		<div className="absolute top-0 left-0 flex gap-3">
			<button
				type="button"
				data-visible={state.can({ type: "FIGHT" })}
				className="border px-6 py-3 data-[visible=true]:block hidden"
				onClick={() => player.send({ type: "FIGHT" })}
			>
				FIGHT
			</button>
			<button
				type="button"
				data-visible={state.can({ type: "WIN" })}
				className="border px-6 py-3 data-[visible=true]:block hidden"
				onClick={() => player.send({ type: "WIN" })}
			>
				WIN
			</button>
			<button
				type="button"
				data-visible={state.can({ type: "LOSE" })}
				className="border px-6 py-3 data-[visible=true]:block hidden"
				onClick={() => player.send({ type: "LOSE" })}
			>
				LOSE
			</button>
			<button
				type="button"
				data-visible={state.can({ type: "RESURRECT" })}
				className="border px-6 py-3 data-[visible=true]:block hidden"
				onClick={() => player.send({ type: "RESURRECT" })}
			>
				RESURECT
			</button>
		</div>
	);
}

function WinButton() {
	const player = PlayerMachineContext.useActorRef();
	const state = useSelector(player, (state) => state);

	if (state.can({ type: "WIN" })) {
		return (
			<button
				type="button"
				className="border px-6 py-3"
				onClick={() => player.send({ type: "WIN" })}
			>
				WIN
			</button>
		);
	}
}

function Board() {
	const player = PlayerMachineContext.useActorRef();
	const state = useSelector(player, (state) => state);

	if (state.value === "FIGHTING") {
		return <FightingBoard />;
	}

	if (state.value === "DEAD") {
		return <DeadBoard />;
	}

	return <IdleBoard />;
}

function IdleBoard() {
	return (
		<section
			className="border relative "
			style={{
				width: `${GRID_COLS * CELL_WIDTH}px`,
				height: `${GRID_ROWS * CELL_HEIGHT}px`,
			}}
		>
			{boardGrid.map(([x, y]) => (
				<div
					key={`${x}${y}`}
					className="border grid place-items-center"
					style={{
						position: "absolute",
						width: `${CELL_WIDTH}px`,
						height: `${CELL_HEIGHT}px`,
						top: `${y * CELL_HEIGHT}px`,
						left: `${x * CELL_WIDTH}px`,
					}}
				/>
			))}
		</section>
	);
}

function FightingBoard() {
	return (
		<section
			className="border relative bg-red-500"
			style={{
				width: `${GRID_COLS * CELL_WIDTH}px`,
				height: `${GRID_ROWS * CELL_HEIGHT}px`,
			}}
		>
			{boardGrid.map(([x, y]) => (
				<div
					key={`${x}${y}`}
					className="border grid place-items-center"
					style={{
						position: "absolute",
						width: `${CELL_WIDTH}px`,
						height: `${CELL_HEIGHT}px`,
						top: `${y * CELL_HEIGHT}px`,
						left: `${x * CELL_WIDTH}px`,
					}}
				/>
			))}
		</section>
	);
}

function DeadBoard() {
	return (
		<section
			className="border relative bg-zinc-500/30"
			style={{
				width: `${GRID_COLS * CELL_WIDTH}px`,
				height: `${GRID_ROWS * CELL_HEIGHT}px`,
			}}
		>
			{boardGrid.map(([x, y]) => (
				<div
					key={`${x}${y}`}
					className="border grid place-items-center"
					style={{
						position: "absolute",
						width: `${CELL_WIDTH}px`,
						height: `${CELL_HEIGHT}px`,
						top: `${y * CELL_HEIGHT}px`,
						left: `${x * CELL_WIDTH}px`,
					}}
				/>
			))}
		</section>
	);
}
