import { Sudoku } from "../../domain/entity/sudoku";
import { NotFoundError } from "../../domain/error/not-found-error";
import { SudokuRepository } from "../../domain/usecase/sudoku";
import { sampleSudoku1 } from "./sample-sudokus";

export class MemorySudokuRepository implements SudokuRepository {
  private _repo: Record<string, Sudoku> = {
    [sampleSudoku1.id]: sampleSudoku1,
  };

  async write(sudoku: Sudoku): Promise<void> {
    this._repo[sudoku.id] = sudoku;
  }

  async read(id: string): Promise<Sudoku> {
    if (this._repo[id]) {
      return this._repo[id];
    }

    throw new NotFoundError(`Sudoku with id ${id} not found`);
  }
}
