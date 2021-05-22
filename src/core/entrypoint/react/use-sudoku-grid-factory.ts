import { useState } from "react";
import { SudokuGrid } from "../../domain/entity/sudoku-grid";
import { Usecase } from "../../domain/usecase/usecase";
import { AsyncState } from "./async-state";
import { HookFactory } from "./hook-factory";

export type UseSudokuGridHook =
  | PendingUseSudokuGridHook
  | FulfilledUseSudokuGridHook
  | RejectedUseSudokuGridHook;

interface PendingUseSudokuGridHook {
  asyncState: AsyncState.PENDING;
}

interface FulfilledUseSudokuGridHook {
  asyncState: AsyncState.FULFILLED;
  grid: SudokuGrid;
}

interface RejectedUseSudokuGridHook {
  asyncState: AsyncState.REJECTED;
}

export const UseSudokuGridFactoryName = "UseSudokuGridFactory";
export type UseSudokuGrid = (id: string) => UseSudokuGridHook;

export class UseSudokuGridFactory implements HookFactory<UseSudokuGrid> {
  constructor(private _readSudokuGrid: Usecase<string, Promise<SudokuGrid>>) {}

  hook(): UseSudokuGrid {
    return (id: string): UseSudokuGridHook => {
      const [result, setResult] = useState<UseSudokuGridHook>({
        asyncState: AsyncState.PENDING,
      });

      if (result.asyncState === AsyncState.PENDING) {
        (async () => {
          try {
            const grid = await this._readSudokuGrid.handle(id);
            setResult({ asyncState: AsyncState.FULFILLED, grid });
          } catch (e) {
            setResult({ asyncState: AsyncState.REJECTED });
          }
        })();
      }

      return result;
    };
  }
}
