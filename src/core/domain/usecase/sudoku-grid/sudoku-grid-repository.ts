import { SudokuGrid } from "../../entity/sudoku-grid";

export interface SudokuGridRepository {
  create(grid: SudokuGrid): Promise<void>;
  read(id: string): Promise<SudokuGrid>;
}
