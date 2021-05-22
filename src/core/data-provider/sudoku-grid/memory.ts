import { SudokuGrid } from "../../domain/entity/sudoku-grid";
import { SudokuGridRepository } from "../../domain/usecase/sudoku-grid";
import { sampleGrid1 } from "./sample-grids";

export class MemorySudokuGridRepository implements SudokuGridRepository {
  private _repo: Record<string, SudokuGrid> = {
    [sampleGrid1.id]: sampleGrid1,
  };

  async create(sudokuGrid: SudokuGrid): Promise<void> {
    this._repo[sudokuGrid.id] = sudokuGrid;
  }
}
