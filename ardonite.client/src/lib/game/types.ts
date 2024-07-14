export type Position = {
	x: number;
	y: number;
};

export type Cell = {
	id: number;
	position: Position;
};

export type Board = {
	width: number;
	height: number;
	size: number;
	cells: Cell[];
};
