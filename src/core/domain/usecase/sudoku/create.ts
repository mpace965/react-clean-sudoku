import { v4 as uuidv4 } from "uuid";
import { Usecase } from "../usecase";
import { Sudoku, SudokuGrid } from "../../entity/sudoku";
import { SudokuRepository } from "./sudoku-repository";

export const CreateSudokuUsecaseName = Symbol.for("CreateSudokuUsecase");

export class CreateSudokuUsecase
  implements Usecase<SudokuGrid, Promise<string>>
{
  constructor(private _sudokuRepository: SudokuRepository) {}

  async handle(grid: SudokuGrid): Promise<string> {
    const sudoku = new Sudoku(uuidv4(), grid);

    await this._sudokuRepository.write(sudoku);

    return sudoku.id;
  }
}
