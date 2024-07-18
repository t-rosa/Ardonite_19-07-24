import { createActorContext } from "@xstate/react";
import { assign, setup } from "xstate";
import { PLAYER_INITIAL_COORDINATE, PLAYER_MOVE_SPEED } from "../constants";
import type { Coordinate } from "../types";

type PlayerMachineContext = {
	coordinates: Coordinate;
	destination: Coordinate;
	xDelta: number;
	yDelta: number;
	sprite: string;
	facing: "left" | "right";
};

type PlayerMachineEvents =
	| { type: "player.move"; destination: number[] }
	| { type: "player.resurrect" }
	| { type: "player.fight" }
	| { type: "player.win" }
	| { type: "player.lose" };

const initialContext: PlayerMachineContext = {
	coordinates: PLAYER_INITIAL_COORDINATE,
	destination: [0, 0],
	xDelta: 0,
	yDelta: 0,
	sprite: "idle.gif",
	facing: "right",
};

export const playerMachine = setup({
	types: {
		context: {} as PlayerMachineContext,
		events: {} as PlayerMachineEvents,
	},
	actions: {
		moveX: assign(({ context }) => {
			return {
				coordinates: [context.destination[0], context.coordinates[1]],
			};
		}),
		moveY: assign(({ context }) => {
			return {
				coordinates: [context.coordinates[0], context.destination[1]],
			};
		}),
	},
	delays: {
		xTravelTime: ({ context }) => {
			return context.xDelta * PLAYER_MOVE_SPEED;
		},
		yTravelTime: ({ context }) => {
			return context.yDelta * PLAYER_MOVE_SPEED;
		},
	},
}).createMachine({
	context: initialContext,
	id: "PLAYER",
	initial: "IDLE",
	states: {
		IDLE: {
			entry: assign({
				sprite: "idle.gif",
				destination: [0, 0],
			}),
			on: {
				"player.move": {
					actions: assign(({ context, event }) => {
						return {
							destination: event.destination,
							xDelta: Math.abs(context.coordinates[0] - event.destination[0]),
							yDelta: Math.abs(context.coordinates[1] - event.destination[1]),
							facing:
								context.coordinates[0] < event.destination[0]
									? "right"
									: "left",
						};
					}),
					target: "MOVING",
				},
				"player.fight": {
					target: "FIGHTING",
				},
			},
		},
		MOVING: {
			initial: "MOVING_X",
			states: {
				MOVING_X: {
					entry: {
						type: "moveX",
					},
					exit: assign({
						xDelta: 0,
					}),
					after: {
						xTravelTime: {
							target: "MOVING_Y",
						},
					},
				},
				MOVING_Y: {
					entry: {
						type: "moveY",
					},
					exit: assign({
						yDelta: 0,
					}),
					after: {
						yTravelTime: {
							target: "#PLAYER.IDLE",
						},
					},
				},
			},
		},
		FIGHTING: {
			on: {
				"player.win": {
					target: "IDLE",
				},
				"player.lose": {
					target: "DEAD",
				},
			},
		},
		DEAD: {
			on: {
				"player.resurrect": {
					target: "IDLE",
				},
			},
		},
	},
});

export const PlayerMachineContext = createActorContext(playerMachine);
