import { container } from "../configuration";
import {
  UseSudokuFactory,
  UseSudokuFactoryName,
  UseSudokuGameFactory,
  UseSudokuGameFactoryName,
} from "../entrypoint/react";

export { AsyncState } from "../entrypoint/react";

export const useSudoku = container
  .get<UseSudokuFactory>(UseSudokuFactoryName)
  .hook();

export const useSudokuGame = container
  .get<UseSudokuGameFactory>(UseSudokuGameFactoryName)
  .hook();
