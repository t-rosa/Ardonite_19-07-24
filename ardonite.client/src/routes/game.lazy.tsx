import { Board } from "@/lib/board/board";
import { PlayerMachineContext } from "@/lib/player/machine";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useSelector } from "@xstate/react";
import { css } from "styled-system/css";
import { Grid } from "styled-system/jsx";

export const Route = createLazyFileRoute("/game")({
	component: Page,
});

function Page() {
	const player = PlayerMachineContext.useActorRef();
	const currentState = useSelector(player, (state) => state.value);

	return (
		<main>
			<Grid placeItems="center" p="9">
				<div
					className={css({
						border: "dashed",
						borderWidth: "1",
						px: "6",
						py: "3",
					})}
				>
					{JSON.stringify(currentState)}
				</div>
			</Grid>
			<Grid placeItems="center">
				<Board />
			</Grid>
		</main>
	);
}
