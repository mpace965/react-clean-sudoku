import { SudokuGrid } from "../../entity/sudoku-grid";
import { Usecase } from "../usecase";
import { SudokuGridRepository } from "./sudoku-grid-repository";

export const PlaySudokuUseCaseName = Symbol.for("PlaySudokuUseCase");

export class PlaySudokuUseCase
  implements Usecase<PlaySudokuInput, Promise<void>>
{
  constructor(private _sudokuGridRepository: SudokuGridRepository) {}

  async handle({
    id,
    getNextGuess,
    displayGrid,
  }: PlaySudokuInput): Promise<void> {
    const grid = await this._sudokuGridRepository.read(id);

    while (!grid.isSolved()) {
      const { row, column, value } = await getNextGuess();
      grid.guess(row, column, value);
      await this._sudokuGridRepository.write(grid);
      displayGrid(grid);
    }
  }
}

export interface PlaySudokuInput {
  id: string;
  getNextGuess: () => Promise<SudokuGuess>;
  displayGrid: (grid: SudokuGrid) => void;
}

interface SudokuGuess {
  row: number;
  column: number;
  value?: number;
}
