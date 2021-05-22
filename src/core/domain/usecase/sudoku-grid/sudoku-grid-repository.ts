import { SudokuGrid } from "../../entity/sudoku-grid";

export interface SudokuGridRepository {
  write(grid: SudokuGrid): Promise<void>;
  read(id: string): Promise<SudokuGrid>;
}
