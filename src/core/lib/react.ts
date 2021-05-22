import { container } from "../configuration";
import {
  UseSudokuGameFactory,
  UseSudokuGameFactoryName,
} from "../entrypoint/react/use-sudoku-game-factory";
import {
  UseSudokuFactory,
  UseSudokuFactoryName,
} from "../entrypoint/react/use-sudoku-factory";

export { AsyncState } from "../entrypoint/react/async-state";

export const useSudoku = container
  .get<UseSudokuFactory>(UseSudokuFactoryName)
  .hook();

export const useSudokuGame = container
  .get<UseSudokuGameFactory>(UseSudokuGameFactoryName)
  .hook();
