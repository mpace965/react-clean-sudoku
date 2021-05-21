import { useState } from "react";
import { SudokuGridSquares } from "../../domain/entity/sudoku-grid";
import {
  OpenSudokuSquare,
  FixedSudokuSquare,
} from "../../domain/entity/sudoku-square";
import { Usecase } from "../../domain/usecase/usecase";

interface UseSudokuGridHook {
  gridId?: string;
}

export const UseSudokuGridName = "useSudokuGrid";
export type UseSudokuGrid = ReturnType<typeof useSudokuGridFactory>;

export function useSudokuGridFactory(
  createSudokuGrid: Usecase<SudokuGridSquares, Promise<string>>
): () => UseSudokuGridHook {
  return function useSudokuGrid(): UseSudokuGridHook {
    const [gridId, setGridId] = useState<string | undefined>(undefined);
    const [fetching, setFetching] = useState(false);

    if (!gridId && !fetching) {
      setFetching(true);
      (async () => {
        const newGridId = await createSudokuGrid.handle(exampleGrid);
        setGridId(newGridId);
        setFetching(false);
      })();
    }

    return { gridId };
  };
}

const exampleGrid = [
  [
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(6),
    new FixedSudokuSquare(3),
    new FixedSudokuSquare(4),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
  ],
  [
    new OpenSudokuSquare(),
    new FixedSudokuSquare(4),
    new FixedSudokuSquare(1),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(7),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
  ],
  [
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(7),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(3),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
  ],
  [
    new FixedSudokuSquare(6),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(2),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
  ],
  [
    new OpenSudokuSquare(),
    new FixedSudokuSquare(2),
    new FixedSudokuSquare(9),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(6),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(4),
  ],
  [
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(9),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(5),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(1),
    new OpenSudokuSquare(),
  ],
  [
    new FixedSudokuSquare(9),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(2),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(6),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
  ],
  [
    new FixedSudokuSquare(1),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(3),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
  ],
  [
    new FixedSudokuSquare(2),
    new FixedSudokuSquare(5),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new FixedSudokuSquare(1),
    new FixedSudokuSquare(7),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
    new OpenSudokuSquare(),
  ],
];
