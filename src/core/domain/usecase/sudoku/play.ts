import { Sudoku } from "../../entity/sudoku";
import { Usecase } from "../usecase";
import { SudokuRepository } from "./repository";

export const PlaySudokuUseCaseName = Symbol.for("PlaySudokuUseCase");

export class PlaySudokuUseCase implements Usecase<PlaySudokuUseCaseHandler> {
  constructor(private _sudokuRepository: SudokuRepository) {}

  async handle(
    id: string,
    row: number,
    column: number,
    value?: number
  ): Promise<Sudoku> {
    const sudoku = await this._sudokuRepository.read(id);
    sudoku.guess(row, column, value);
    await this._sudokuRepository.write(sudoku);
    return sudoku;
  }
}

export type PlaySudokuUseCaseHandler =
  typeof PlaySudokuUseCase.prototype.handle;
