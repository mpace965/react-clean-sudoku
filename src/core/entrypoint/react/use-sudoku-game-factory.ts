import { useEffect, useState } from "react";
import { SudokuGrid } from "../../domain/entity/sudoku-grid";
import { PlaySudokuInput } from "../../domain/usecase/sudoku-grid/play";
import { Usecase } from "../../domain/usecase/usecase";
import { HookFactory } from "./hook-factory";

export const UseSudokuGameFactoryName = Symbol.for("UseSudokuGameFactory");

export class UseSudokuGameFactory implements HookFactory<UseSudokuGame> {
  constructor(
    private _playSudoku: Usecase<PlaySudokuInput, Promise<SudokuGrid>>,
    private _readSudokuGrid: Usecase<string, Promise<SudokuGrid>>
  ) {}

  hook(): UseSudokuGame {
    return (id: string) => {
      const [grid, setGrid] = useState<SudokuGrid>();

      useEffect(() => {
        (async () => {
          const grid = await this._readSudokuGrid.handle(id);
          setGrid(grid);
        })();
      }, []);

      const makeGuess = (row: number, column: number, value?: number) => {
        (async () => {
          const grid = await this._playSudoku.handle({
            id,
            row,
            column,
            value,
          });
          setGrid(grid);
        })();
      };

      return { grid, makeGuess };
    };
  }
}

export type UseSudokuGame = (id: string) => UseSudokuGameHook;

export interface UseSudokuGameHook {
  grid?: SudokuGrid;
  makeGuess: (row: number, column: number, value?: number) => void;
}
