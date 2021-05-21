import { injectable } from "inversify";
import { SudokuGrid } from "../../domain/entity/sudoku-grid";
import { SudokuGridRepository } from "../../domain/usecase/sudoku-grid";

@injectable()
export class MemorySudokuGridRepository implements SudokuGridRepository {
  private _repo: Record<string, SudokuGrid> = {};

  async create(sudokuGrid: SudokuGrid): Promise<void> {
    this._repo[sudokuGrid.id] = sudokuGrid;
  }
}
