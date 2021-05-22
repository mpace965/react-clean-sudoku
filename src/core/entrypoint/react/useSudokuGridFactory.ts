import { useState } from "react";
import { SudokuGrid } from "../../domain/entity/sudoku-grid";
import { Usecase } from "../../domain/usecase/usecase";

interface UseSudokuGridHook {
  grid?: SudokuGrid;
}

export const UseSudokuGridName = "useSudokuGrid";
export type UseSudokuGrid = ReturnType<typeof useSudokuGridFactory>;

export function useSudokuGridFactory(
  readSudokuGrid: Usecase<string, Promise<SudokuGrid>>
) {
  return function useSudokuGrid(id: string): UseSudokuGridHook {
    const [grid, setGrid] = useState<SudokuGrid | undefined>(undefined);
    const [fetching, setFetching] = useState(false);

    if (!grid && !fetching) {
      setFetching(true);
      (async () => {
        const newGrid = await readSudokuGrid.handle(id);
        setGrid(newGrid);
        setFetching(false);
      })();
    }

    return { grid };
  };
}
