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
		},
		events: {} as
			| { type: "RESURRECT" }
			| { type: "FIGHT" }
			| { type: "WIN" }
			| { type: "LOSE" }
			| { type: "MOVE"; coordinates: Coordinate },
	},
	delays: {
		travelTime: ({ context }) => {
			return (context.dx + context.dy) * PLAYER_MOVE_SPEED;
		},
	},
}).createMachine({
	context: {
		sprite: "idle.gif",
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
				MOVE: {
					actions: assign(({ context, event }) => {
						return {
							coordinates: event.coordinates,
							dx: Math.abs(context.coordinates[0] - event.coordinates[0]),
							dy: Math.abs(context.coordinates[1] - event.coordinates[1]),
							sprite: "walk.gif",
						};
					}),
					target: "MOVING",
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
		MOVING: {
			after: {
				travelTime: {
					target: "IDLE",
					actions: assign({
						dx: 0,
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
