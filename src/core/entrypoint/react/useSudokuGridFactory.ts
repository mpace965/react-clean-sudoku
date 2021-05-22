import { useState } from "react";
import { SudokuGridSquares } from "../../domain/entity/sudoku-grid";
import { Usecase } from "../../domain/usecase/usecase";

interface UseSudokuGridHook {
  gridId?: string;
}

export const UseSudokuGridName = "useSudokuGrid";
export type UseSudokuGrid = ReturnType<typeof useSudokuGridFactory>;

export function useSudokuGridFactory(
  createSudokuGrid: Usecase<SudokuGridSquares, Promise<string>>
) {
  return function useSudokuGrid(
    gridSquares: SudokuGridSquares
  ): UseSudokuGridHook {
    const [gridId, setGridId] = useState<string | undefined>(undefined);
    const [fetching, setFetching] = useState(false);

    if (!gridId && !fetching) {
      setFetching(true);
      (async () => {
        const newGridId = await createSudokuGrid.handle(gridSquares);
        setGridId(newGridId);
        setFetching(false);
      })();
    }

    return { gridId };
  };
}
