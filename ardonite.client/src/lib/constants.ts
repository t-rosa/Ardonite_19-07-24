import type { Coordinate } from "./types";

export const GRID_COLS = 9;
export const GRID_ROWS = 9;
export const CELL_HEIGHT = 64;
export const CELL_WIDTH = 96;

export const GRID_WIDTH = CELL_WIDTH * GRID_ROWS;
export const GRID_HEIGHT = CELL_HEIGHT * GRID_COLS;

export const PLAYER_INITIAL_COORDINATE: Coordinate = [0, 0];
export const PLAYER_WIDTH = 28;
export const PLAYER_HEIGHT = 32;
export const PLAYER_MOVE_SPEED = 200;
