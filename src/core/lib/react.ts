import { container } from "../configuration";
import {
  UseSudokuGameFactory,
  UseSudokuGameFactoryName,
} from "../entrypoint/react";

export const useSudokuGame = container
  .get<UseSudokuGameFactory>(UseSudokuGameFactoryName)
  .hook();
