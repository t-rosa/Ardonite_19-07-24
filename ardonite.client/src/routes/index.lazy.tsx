import { GameMachineContext } from "@/lib/game/machine";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
	component: Page,
});

function Page() {
	const game = GameMachineContext.useActorRef();

	return (
		<main className="h-dvh grid place-items-center">
			<Link
				to="/game"
				className="px-6 py-3 border"
				onClick={() => game.send({ type: "START" })}
			>
				COMMENCER
			</Link>
		</main>
	);
}
