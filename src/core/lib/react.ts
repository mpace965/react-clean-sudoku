import { container } from "../configuration";
import {
  UseSudokuGridFactory,
  UseSudokuGridFactoryName,
} from "../entrypoint/react/UseSudokuGridFactory";

export const useSudokuGrid = container
  .get<UseSudokuGridFactory>(UseSudokuGridFactoryName)
  .hook();
