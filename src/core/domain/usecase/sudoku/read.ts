import { Sudoku } from "../../entity/sudoku";
import { Usecase } from "../usecase";
import { SudokuRepository } from "./sudoku-repository";

export const ReadSudokuUsecaseName = Symbol.for("ReadSudokuUsecase");

export class ReadSudokuUsecase implements Usecase<string, Promise<Sudoku>> {
  constructor(private _sudokuRepository: SudokuRepository) {}

  async handle(id: string): Promise<Sudoku> {
    return await this._sudokuRepository.read(id);
  }
}