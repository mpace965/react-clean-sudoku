import { SudokuGrid } from "../../entity/sudoku-grid";
import { Usecase } from "../usecase";
import { SudokuGridRepository } from "./sudoku-grid-repository";

export const PlaySudokuUseCaseName = Symbol.for("PlaySudokuUseCase");

export class PlaySudokuUseCase
  implements Usecase<PlaySudokuInput, Promise<SudokuGrid>>
{
  constructor(private _sudokuGridRepository: SudokuGridRepository) {}

  async handle({
    id,
    row,
    column,
    value,
  }: PlaySudokuInput): Promise<SudokuGrid> {
    const grid = await this._sudokuGridRepository.read(id);
    grid.guess(row, column, value);
    await this._sudokuGridRepository.write(grid);
    return grid;
  }
}

export interface PlaySudokuInput {
  id: string;
  row: number;
  column: number;
  value?: number;
}

export interface SudokuGuess {
  row: number;
  column: number;
  value?: number;
}
