import { Container } from "inversify";
import { sudoku } from "./sudoku";
import { react } from "./react";

export const container = new Container();

container.load(sudoku);
container.load(react);
