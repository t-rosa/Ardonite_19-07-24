import { createActorContext } from "@xstate/react";
import { setup } from "xstate";
import type { Coordinate } from "../types";

type MonsterMachineContext = {
	sprite: string;
	coordinates: Coordinate;
	facing: "left" | "right";
};

const initialContext: MonsterMachineContext = {
	coordinates: [8, 8],
	sprite: "monster/idle.gif",
	facing: "left",
};

export const monsterMachine = setup({
	types: {
		context: {} as MonsterMachineContext,
	},
}).createMachine({
	context: initialContext,
	id: "MONSTER",
	initial: "IDLE",
	states: {
		IDLE: {},
	},
});

export const MonsterMachineContext = createActorContext(monsterMachine);
