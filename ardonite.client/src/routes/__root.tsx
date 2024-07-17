import { PlayerMachineContext } from "@/lib/player/machine";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { css } from "styled-system/css";

export const Route = createRootRoute({
	component: Layout,
});

function Layout() {
	return (
		<PlayerMachineContext.Provider>
			<div
				className={css({
					h: "dvh",
				})}
			>
				<Outlet />
			</div>
		</PlayerMachineContext.Provider>
	);
}
