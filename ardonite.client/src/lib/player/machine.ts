import { createActorContext } from "@xstate/react";
import { setup } from "xstate";

export const playerMachine = setup({
	types: {
		context: {},
		events: {} as
			| { type: "FIGHT" }
			| { type: "RESURRECT" }
			| { type: "LOSE" }
			| { type: "WIN" },
	},
}).createMachine({
	context: {},
	id: "PLAYER",
	initial: "IDLE",
	states: {
		IDLE: {
			on: {
				FIGHT: {
					target: "FIGHTING",
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
