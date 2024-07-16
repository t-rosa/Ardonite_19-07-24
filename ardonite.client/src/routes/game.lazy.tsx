import { Board } from "@/lib/board/board";
import { PlayerMachineContext } from "@/lib/player/machine";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useSelector } from "@xstate/react";

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
					{JSON.stringify(currentState)}
				</div>
			</div>
			<div className="grid place-items-center">
				<Board />
			</div>
		</main>
	);
}
