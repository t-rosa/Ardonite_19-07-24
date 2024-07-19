import { Board } from "@/lib/board/board";
import { PlayerMachineContext } from "@/lib/player/machine";
import { createLazyFileRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";
import { Grid } from "styled-system/jsx";

export const Route = createLazyFileRoute("/game")({
	component: Page,
});

function Page() {
	return (
		<main>
			<PlayerState />
			<Grid placeItems="center">
				<div
					className={css({
						borderWidth: 1,
						p: 3,
					})}
				>
					<Board />
				</div>
			</Grid>
		</main>
	);
}

function PlayerState() {
	const currentState = PlayerMachineContext.useSelector((state) => state.value);

	return (
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
	);
}
