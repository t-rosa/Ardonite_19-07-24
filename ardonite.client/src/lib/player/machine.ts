import { createActorContext } from "@xstate/react";
import { assign, setup } from "xstate";
import { PLAYER_INITIAL_COORDINATE, PLAYER_MOVE_SPEED } from "../constants";
import type { Coordinate } from "../types";

export const playerMachine = setup({
	types: {
		context: {} as {
			coordinates: Coordinate;
			sprite: string;
			dx: number;
			dy: number;
			facing: "left" | "right";
		},
		events: {} as
			| { type: "RESURRECT" }
			| { type: "FIGHT" }
			| { type: "WIN" }
			| { type: "LOSE" }
			| { type: "MOVE_X"; x: number }
			| { type: "MOVE_Y"; y: number },
	},
	delays: {
		travelTime: ({ context }) => {
			return (context.dx + context.dy) * PLAYER_MOVE_SPEED;
		},
	},
}).createMachine({
	context: {
		sprite: "idle.gif",
		facing: "right",
		coordinates: PLAYER_INITIAL_COORDINATE,
		dx: 0,
		dy: 0,
	},
	id: "PLAYER",
	initial: "IDLE",
	states: {
		IDLE: {
			entry: assign({
				sprite: "idle.gif",
			}),
			on: {
				FIGHT: {
					target: "FIGHTING",
				},
				MOVE_X: {
					actions: assign(({ context, event }) => {
						return {
							coordinates: [event.x, context.coordinates[1]],
							dx: Math.abs(context.coordinates[0] - event.x),
							sprite: "walk.gif",
							facing: context.coordinates[0] > event.x ? "left" : "right",
						};
					}),
					target: "MOVING_X",
				},
				MOVE_Y: {
					actions: assign(({ context, event }) => {
						return {
							coordinates: [context.coordinates[0], event.y],
							dy: Math.abs(context.coordinates[1] - event.y),
							sprite: "walk.gif",
						};
					}),
					target: "MOVING_Y",
				},
			},
		},
		FIGHTING: {
			on: {
				LOSE: {
					target: "DEAD",
				},
				WIN: {
					target: "IDLE",
				},
			},
		},
		MOVING_X: {
			after: {
				travelTime: {
					target: "IDLE",
					actions: assign({
						dx: 0,
					}),
				},
			},
		},
		MOVING_Y: {
			after: {
				travelTime: {
					target: "IDLE",
					actions: assign({
						dy: 0,
					}),
				},
			},
		},
		DEAD: {
			on: {
				RESURRECT: {
					target: "IDLE",
				},
			},
		},
	},
});

export const PlayerMachineContext = createActorContext(playerMachine);
