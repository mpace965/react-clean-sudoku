import { SudokuGrid } from "../../domain/entity/sudoku-grid";
import { NotFoundError } from "../../domain/error/not-found-error";
import { SudokuGridRepository } from "../../domain/usecase/sudoku-grid";
import { sampleGrid1 } from "./sample-grids";

export class MemorySudokuGridRepository implements SudokuGridRepository {
  private _repo: Record<string, SudokuGrid> = {
    [sampleGrid1.id]: sampleGrid1,
  };

  async write(sudokuGrid: SudokuGrid): Promise<void> {
    this._repo[sudokuGrid.id] = sudokuGrid;
  }

  async read(id: string): Promise<SudokuGrid> {
    if (this._repo[id]) {
      return this._repo[id];
    }

    throw new NotFoundError(`SudokuGrid with id ${id} not found`);
  }
}
