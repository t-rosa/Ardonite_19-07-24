import { PlayerMachineContext } from "../machine";

export function usePlayer() {
	const xDelta = PlayerMachineContext.useSelector(
		(state) => state.context.xDelta,
	);
	const yDelta = PlayerMachineContext.useSelector(
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

	const isMoving = PlayerMachineContext.useSelector((state) =>
		state.matches("MOVING"),
	);

	return { xDelta, yDelta, sprite, facing, x, y, isMoving };
}
