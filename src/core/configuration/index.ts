import { Container } from "inversify";
import { sudoku } from "./sudoku";

export const container = new Container();

container.load(sudoku);
