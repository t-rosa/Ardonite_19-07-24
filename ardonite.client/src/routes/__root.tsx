import { PlayerMachineContext } from "@/lib/player/machine";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: Layout,
});

function Layout() {
	return (
		<PlayerMachineContext.Provider>
			<Outlet />
		</PlayerMachineContext.Provider>
	);
}
