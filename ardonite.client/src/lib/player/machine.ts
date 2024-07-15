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
			| { type: "player.move.x"; x: number }
			| { type: "player.move.y"; y: number }
			| { type: "player.resurrect" }
			| { type: "player.fight" }
			| { type: "player.win" }
			| { type: "player.lose" },
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
				"player.fight": {
					target: "FIGHTING",
				},
				"player.move.x": {
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
				"player.move.y": {
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
				"player.win": {
					target: "IDLE",
				},
				"player.lose": {
					target: "DEAD",
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
				"player.resurrect": {
					target: "IDLE",
				},
			},
		},
	},
});

export const PlayerMachineContext = createActorContext(playerMachine);
