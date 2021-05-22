import { useState } from "react";
import { SudokuGrid } from "../../domain/entity/sudoku-grid";
import { Usecase } from "../../domain/usecase/usecase";
import { HookFactory } from "./HookFactory";

interface UseSudokuGridHook {
  grid?: SudokuGrid;
}

export const UseSudokuGridFactoryName = "UseSudokuGridFactory";
export type UseSudokuGrid = (id: string) => UseSudokuGridHook;

export class UseSudokuGridFactory implements HookFactory<UseSudokuGrid> {
  constructor(private _readSudokuGrid: Usecase<string, Promise<SudokuGrid>>) {}

  hook(): UseSudokuGrid {
    return (id: string): UseSudokuGridHook => {
      const [grid, setGrid] = useState<SudokuGrid | undefined>(undefined);
      const [fetching, setFetching] = useState(false);

      if (!grid && !fetching) {
        setFetching(true);
        (async () => {
          const newGrid = await this._readSudokuGrid.handle(id);
          setGrid(newGrid);
          setFetching(false);
        })();
      }

      return { grid };
    };
  }
}
