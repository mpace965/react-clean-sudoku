import { Container } from "inversify";
import { sudokuGrid } from "./sudoku-grid";
import { react } from "./react";

export const container = new Container();

container.load(sudokuGrid);
container.load(react);
