import { Container } from "inversify";
import { sudokuGrid } from "./sudoku-grid";

export const container = new Container();

container.load(sudokuGrid);
