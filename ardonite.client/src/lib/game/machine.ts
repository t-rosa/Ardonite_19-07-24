import { createActorContext } from "@xstate/react";
import { assign, setup } from "xstate";
import { boardGrid } from "./board";
import { TICK_RATE } from "./constants";
import type { Board, Position } from "./types";

export const gameMachine = setup({
	types: {
		context: {} as {
			clock: number;
			TICK_RATE: number;
			player: {
				position: Position;
			};
			board: Board;
		},
		events: {} as
			| { type: "MOVE"; position: Position }
			| { type: "MOVE_LEFT" }
			| { type: "MOVE_RIGHT" }
			| { type: "MOVE_UP" }
			| { type: "MOVE_DOWN" },
	},
	actions: {
		start: ({ context }) => {
			console.log("START");

			let nextTimeToTick = Date.now();

			function nextAnimationFrame() {
				const now = Date.now();

				if (nextTimeToTick <= now) {
					context.clock++;
					nextTimeToTick = now + context.TICK_RATE;
					console.log(context.clock);
				}

				window.requestAnimationFrame(nextAnimationFrame);
			}

			window.requestAnimationFrame(nextAnimationFrame);
		},
	},
}).createMachine({
	context: {
		clock: 0,
		TICK_RATE,
		board: boardGrid,
		player: {
			position: {
				x: 0,
				y: 0,
			},
		},
	},
	id: "GAME",
	initial: "INIT",
	entry: "start",
	states: {
		INIT: {
			on: {
				MOVE_LEFT: {
					actions: assign({
						player: ({ context }) => {
							return {
								...context.player,
								position: {
									...context.player.position,
									x: context.player.position.x - 1,
								},
							};
						},
					}),
				},
				MOVE_RIGHT: {
					actions: assign({
						player: ({ context }) => {
							return {
								...context.player,
								position: {
									...context.player.position,
									x: context.player.position.x + 1,
								},
							};
						},
					}),
				},
				MOVE_DOWN: {
					actions: assign({
						player: ({ context }) => {
							return {
								...context.player,
								position: {
									...context.player.position,
									y: context.player.position.y + 1,
								},
							};
						},
					}),
				},
				MOVE_UP: {
					actions: assign({
						player: ({ context }) => {
							return {
								...context.player,
								position: {
									...context.player.position,
									y: context.player.position.y - 1,
								},
							};
						},
					}),
				},
				MOVE: {
					actions: assign({
						player: ({ context, event }) => ({
							...context.player,
							position: event.position,
						}),
					}),
				},
			},
		},
	},
});

export const GameMachineContext = createActorContext(gameMachine);
