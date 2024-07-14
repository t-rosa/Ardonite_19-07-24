import { createActorContext } from "@xstate/react";
import { setup } from "xstate";

export const gameMachine = setup({
	types: {
		context: {},
		events: {} as { type: "START" } | { type: "END" },
	},
}).createMachine({
	context: {},
	id: "GAME",
	initial: "IDLE",
	states: {
		IDLE: {
			on: {
				START: {
					target: "STARTED",
				},
			},
		},
		STARTED: {
			on: {
				END: {
					target: "IDLE",
				},
			},
		},
	},
});

export const GameMachineContext = createActorContext(gameMachine);
