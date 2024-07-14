import { createActorContext } from "@xstate/react";
import { assign, setup } from "xstate";
import { PLAYER_INITIAL_COORDINATE, PLAYER_MOVE_DELAY } from "../constants";
import type { Coordinate } from "../types";

export const playerMachine = setup({
	types: {
		context: {} as {
			coordinates: Coordinate;
			sprite: string;
		},
		events: {} as
			| { type: "RESURRECT" }
			| { type: "FIGHT" }
			| { type: "WIN" }
			| { type: "LOSE" }
			| { type: "MOVE_UP"; coordinates: Coordinate }
			| { type: "MOVE_DOWN"; coordinates: Coordinate }
			| { type: "MOVE_RIGHT"; coordinates: Coordinate }
			| { type: "MOVE_LEFT"; coordinates: Coordinate },
	},
	delays: {
		moveDelay: PLAYER_MOVE_DELAY,
	},
}).createMachine({
	context: {
		sprite: "idle.gif",
		coordinates: PLAYER_INITIAL_COORDINATE,
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
				MOVE_RIGHT: {
					actions: assign(({ event }) => {
						return {
							coordinates: event.coordinates,
							sprite: "walk.gif",
						};
					}),
					target: "MOVING_RIGHT",
				},
				MOVE_LEFT: {
					actions: assign(({ event }) => {
						return {
							coordinates: event.coordinates,
							sprite: "walk.gif",
						};
					}),
					target: "MOVING_LEFT",
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
		MOVING_RIGHT: {
			after: {
				moveDelay: {
					target: "IDLE",
				},
			},
		},
		MOVING_LEFT: {
			after: {
				moveDelay: {
					target: "IDLE",
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
