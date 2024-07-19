import { createActorContext } from "@xstate/react";
import { assign, setup } from "xstate";
import { PLAYER_INITIAL_COORDINATE } from "../constants";
import type { Coordinate } from "../types";

type PlayerMachineContext = {
	coordinates: Coordinate;
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
}).createMachine({
	context: initialContext,
	id: "PLAYER",
	initial: "IDLE",
	states: {
		IDLE: {
			on: {
				"player.move": {
					actions: {
						type: "move",
						params: ({ event }) => ({ destination: event.destination }),
					},
				},
				"player.fight": {
					target: "FIGHTING",
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
