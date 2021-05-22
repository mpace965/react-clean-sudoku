import { container } from "../configuration";
import {
  UseSudokuGameFactory,
  UseSudokuGameFactoryName,
} from "../entrypoint/react/use-sudoku-game-factory";
import {
  UseSudokuGridFactory,
  UseSudokuGridFactoryName,
} from "../entrypoint/react/use-sudoku-grid-factory";

export { AsyncState } from "../entrypoint/react/async-state";

export const useSudokuGrid = container
  .get<UseSudokuGridFactory>(UseSudokuGridFactoryName)
  .hook();

export const useSudokuGame = container
  .get<UseSudokuGameFactory>(UseSudokuGameFactoryName)
  .hook();
