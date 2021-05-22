import { container } from "../configuration";
import {
  UseSudokuGridFactory,
  UseSudokuGridFactoryName,
} from "../entrypoint/react/use-sudoku-grid-factory";

export { AsyncState } from "../entrypoint/react/async-state";

export const useSudokuGrid = container
  .get<UseSudokuGridFactory>(UseSudokuGridFactoryName)
  .hook();
