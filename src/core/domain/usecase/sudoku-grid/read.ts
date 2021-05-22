import { SudokuGrid } from "../../entity/sudoku-grid";
import { Usecase } from "../usecase";
import { SudokuGridRepository } from "./sudoku-grid-repository";

export const ReadSudokuGridUsecaseName = "ReadSudokuGridUsecase";

export class ReadSudokuGridUsecase
  implements Usecase<string, Promise<SudokuGrid>>
{
  constructor(private _sudokuGridRepository: SudokuGridRepository) {}

  async handle(id: string): Promise<SudokuGrid> {
    return await this._sudokuGridRepository.read(id);
  }
}
