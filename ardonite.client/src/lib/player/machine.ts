import { createActorContext } from "@xstate/react";
import { assign, setup } from "xstate";
import { PLAYER_INITIAL_COORDINATE, PLAYER_MOVE_SPEED } from "../constants";
import type { Coordinate } from "../types";

type PlayerMachineContext = {
	coordinates: Coordinate;
	worldCoordinates: Coordinate;
	dx: number;
	dy: number;
	sprite: string;
	facingRight: boolean;
};

type PlayerMachineEvents =
	| { type: "player.move"; destination: Coordinate }
	| { type: "player.resurrect" }
	| { type: "player.fight" }
	| { type: "player.win" }
	| { type: "player.lose" };

const initialContext: PlayerMachineContext = {
	coordinates: PLAYER_INITIAL_COORDINATE,
	worldCoordinates: PLAYER_INITIAL_COORDINATE,
	dx: 0,
	dy: 0,
	sprite: "player/idle.gif",
	facingRight: true,
};

export const playerMachine = setup({
	types: {
		context: {} as PlayerMachineContext,
		events: {} as PlayerMachineEvents,
	},
	actions: {
		move: assign(({ context }, params: { destination: Coordinate }) => {
			return {
				coordinates: params.destination,
				dx: Math.abs(context.coordinates[0] - params.destination[0]),
				dy: Math.abs(context.coordinates[1] - params.destination[1]),
				sprite: "player/walk.gif",
				facingRight: context.coordinates[0] < params.destination[0],
			};
		}),
	},
	delays: {
		travelTime: ({ context }) => {
			if (context.dx === 0) {
				return context.dy * PLAYER_MOVE_SPEED;
			}

			if (context.dy === 0) {
				return context.dx * PLAYER_MOVE_SPEED;
			}

			if (context.dx === context.dy) {
				return context.dx * PLAYER_MOVE_SPEED;
			}

			return Math.max(context.dy, context.dy) * PLAYER_MOVE_SPEED;
		},
	},
}).createMachine({
	context: initialContext,
	id: "PLAYER",
	initial: "IDLE",
	states: {
		IDLE: {
			entry: assign({
				sprite: "player/idle.gif",
			}),
			on: {
				"player.move": {
					actions: {
						type: "move",
						params: ({ event }) => ({ destination: event.destination }),
					},
					target: "MOVING",
				},
				"player.fight": {
					target: "FIGHTING",
				},
			},
		},
		MOVING: {
			after: {
				travelTime: {
					target: "IDLE",
				},
			},
		},
		FIGHTING: {
			entry: assign(({ context }) => {
				return {
					worldCoordinates: context.coordinates,
					coordinates: [0, 0],
					dx: 0,
					dy: 0,
				};
			}),
			on: {
				"player.win": {
					target: "IDLE",
					actions: assign(({ context }) => {
						return {
							coordinates: context.worldCoordinates,
							dx: 0,
							dy: 0,
						};
					}),
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
