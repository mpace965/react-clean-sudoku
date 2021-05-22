import { container } from "../configuration";
import {
  UseSudokuGridFactory,
  UseSudokuGridFactoryName,
} from "../entrypoint/react/UseSudokuGridFactory";

export { AsyncState } from "../entrypoint/react/AsyncState";

export const useSudokuGrid = container
  .get<UseSudokuGridFactory>(UseSudokuGridFactoryName)
  .hook();
