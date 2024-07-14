import { useActor } from "@xstate/react";
import { act } from "react";
import { GameMachineContext, gameMachine } from "./lib/game/machine";
import type { Cell, Position } from "./lib/game/types";

export function App() {
	const board = GameMachineContext.useSelector((state) => state.context.board);

	return (
		<main className="h-dvh grid place-items-center">
			<div className="grid grid-cols-[repeat(10,minmax(0,1fr))] p-3 border border-blue-500 relative">
				<Player />
				{board.cells.map((cell) => (
					<>
						<CellUI key={cell.id} cell={cell} />
					</>
				))}
			</div>
		</main>
	);
}

function Player() {
	const gameActor = GameMachineContext.useActorRef();

	const playerX = GameMachineContext.useSelector(
		(state) => state.context.player.position.x,
	);

	const playerY = GameMachineContext.useSelector(
		(state) => state.context.player.position.y,
	);

	return (
		<div
			className="size-10 transition-transform bg-red-500 top-4 left-8 rounded-full absolute grid place-items-center duration-1000 "
			style={{
				transform: `translate(${playerX * 80}px, ${playerY * 48}px)`,
			}}
		>
			P
		</div>
	);
}

function CellUI({ cell }: { cell: Cell }) {
	const gameActor = GameMachineContext.useActorRef();

	function handleClick(position: Position) {
		gameActor.send({
			type: "MOVE",
			position,
		});
	}

	return (
		<button
			key={cell.id}
			type="button"
			className="w-20 h-12 border border-dashed hover:bg-blue-500/50"
			onClick={() => handleClick(cell.position)}
		>
			{cell.position.x}:{cell.position.y}
		</button>
	);
}
