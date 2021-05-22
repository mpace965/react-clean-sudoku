import { Sudoku } from "../../entity/sudoku";

export interface SudokuRepository {
  write(grid: Sudoku): Promise<void>;
  read(id: string): Promise<Sudoku>;
}
