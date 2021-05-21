import { container } from "./configuration";
import {
  UseSudokuGrid,
  UseSudokuGridName,
} from "./entrypoint/react/useSudokuGridFactory";

export const useSudokuGrid = container.get<UseSudokuGrid>(UseSudokuGridName);
