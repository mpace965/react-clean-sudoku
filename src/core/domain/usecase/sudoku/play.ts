import { Sudoku } from "../../entity/sudoku";
import { Usecase } from "../usecase";
import { SudokuRepository } from "./repository";

export const PlaySudokuUseCaseName = Symbol.for("PlaySudokuUseCase");

export class PlaySudokuUseCase
  implements Usecase<PlaySudokuInput, Promise<Sudoku>>
{
  constructor(private _sudokuRepository: SudokuRepository) {}

  async handle({ id, row, column, value }: PlaySudokuInput): Promise<Sudoku> {
    const sudoku = await this._sudokuRepository.read(id);
    sudoku.guess(row, column, value);
    await this._sudokuRepository.write(sudoku);
    return sudoku;
  }
}

export interface PlaySudokuInput {
  id: string;
  row: number;
  column: number;
  value?: number;
}
