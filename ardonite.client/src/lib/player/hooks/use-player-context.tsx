import { PlayerMachineContext } from "../machine";

export function usePlayerContext() {
	const deltaX = PlayerMachineContext.useSelector(
		(state) => state.context.xDelta,
	);
	const deltaY = PlayerMachineContext.useSelector(
		(state) => state.context.yDelta,
	);
	const sprite = PlayerMachineContext.useSelector(
		(state) => state.context.sprite,
	);
	const facing = PlayerMachineContext.useSelector(
		(state) => state.context.facing,
	);
	const x = PlayerMachineContext.useSelector(
		(state) => state.context.coordinates[0],
	);
	const y = PlayerMachineContext.useSelector(
		(state) => state.context.coordinates[1],
	);

	return { deltaX, deltaY, sprite, facing, x, y };
}
