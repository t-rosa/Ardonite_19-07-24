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
			| { type: "MOVE"; coordinates: Coordinate }
			| { type: "MOVE_X"; coordinates: Coordinate }
			| { type: "MOVE_Y"; coordinates: Coordinate },
	},
	delays: {
		travelTime: ({ context, event }) => {
			if (event.type === "MOVE") {
				return context.dx * PLAYER_MOVE_SPEED;
			}
			return 0;
		},
	},
}).createMachine({
	context: {
		sprite: "idle.gif",
		coordinates: PLAYER_INITIAL_COORDINATE,
		dx: 1,
		dy: 1,
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
					actions: assign(({ event }) => {
						return {
							coordinates: event.coordinates,
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
			entry: ({ self, context }) => {
				if (context.dx !== 0) {
					self.send({ type: "MOVE_X", coordinates: context.coordinates });
				}
				self.send({ type: "MOVE_Y", coordinates: context.coordinates });
			},
			on: {
				MOVE_X: {
					actions: assign(({ context, event }) => {
						return {
							dx: Math.abs(context.coordinates[0] - event.coordinates[0]),
						};
					}),
					target: "MOVING",
				},
				MOVE_Y: {
					actions: assign(({ context, event }) => {
						return {
							dy: Math.abs(context.coordinates[1] - event.coordinates[1]),
						};
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
