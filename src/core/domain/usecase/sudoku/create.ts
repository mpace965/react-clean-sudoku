import { v4 as uuidv4 } from "uuid";
import { Usecase } from "../usecase";
import { Sudoku } from "../../entity/sudoku";
import { SudokuRepository } from "./repository";
import { SudokuSquare } from "../../entity/sudoku-square";
import { Grid } from "../../entity/grid";

export const CreateSudokuUsecaseName = Symbol.for("CreateSudokuUsecase");

export class CreateSudokuUsecase
  implements Usecase<Grid<SudokuSquare>, Promise<string>>
{
  constructor(private _sudokuRepository: SudokuRepository) {}

  async handle(grid: Grid<SudokuSquare>): Promise<string> {
    const sudoku = new Sudoku(uuidv4(), grid);

    await this._sudokuRepository.write(sudoku);

    return sudoku.id;
  }
}
