import { container } from "../configuration";
import {
  HookFactory,
  UseSudokuGame,
  UseSudokuGameFactoryName,
} from "../entrypoint/react";

export const useSudokuGame = container
  .get<HookFactory<UseSudokuGame>>(UseSudokuGameFactoryName)
  .hook();
