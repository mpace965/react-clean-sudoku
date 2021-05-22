import { Sudoku } from "../../entity/sudoku";
import { Usecase } from "../usecase";
import { SudokuRepository } from "./repository";

export const ReadSudokuUsecaseName = Symbol.for("ReadSudokuUsecase");

export class ReadSudokuUsecase implements Usecase<ReadSudokuUsecaseHandler> {
  constructor(private _sudokuRepository: SudokuRepository) {}

  async handle(id: string): Promise<Sudoku> {
    return await this._sudokuRepository.read(id);
  }
}

export type ReadSudokuUsecaseHandler =
  typeof ReadSudokuUsecase.prototype.handle;
