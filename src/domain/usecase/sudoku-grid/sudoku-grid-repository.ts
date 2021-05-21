import { SudokuGrid } from "../../entity/sudoku-grid";

export interface SudokuGridRepository {
  create(grid: SudokuGrid): Promise<void>;
}
