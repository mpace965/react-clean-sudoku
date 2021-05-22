import { useState } from "react";
import { Sudoku } from "../../domain/entity/sudoku";
import { Usecase } from "../../domain/usecase/usecase";
import { AsyncState } from "./async-state";
import { HookFactory } from "./hook-factory";

export const UseSudokuFactoryName = Symbol.for("UseSudokuFactory");

export class UseSudokuFactory implements HookFactory<UseSudoku> {
  constructor(private _readSudoku: Usecase<string, Promise<Sudoku>>) {}

  hook(): UseSudoku {
    return (id: string): UseSudokuHook => {
      const [result, setResult] = useState<UseSudokuHook>({
        asyncState: AsyncState.PENDING,
      });

      if (result.asyncState === AsyncState.PENDING) {
        (async () => {
          try {
            const grid = await this._readSudoku.handle(id);
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

export type UseSudoku = (id: string) => UseSudokuHook;

export type UseSudokuHook =
  | PendingUseSudokuHook
  | FulfilledUseSudokuHook
  | RejectedUseSudokuHook;

interface PendingUseSudokuHook {
  asyncState: AsyncState.PENDING;
}

interface FulfilledUseSudokuHook {
  asyncState: AsyncState.FULFILLED;
  grid: Sudoku;
}

interface RejectedUseSudokuHook {
  asyncState: AsyncState.REJECTED;
}
