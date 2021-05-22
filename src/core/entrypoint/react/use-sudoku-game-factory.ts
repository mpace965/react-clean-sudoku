import { useEffect, useState } from "react";
import { ReadonlyGrid } from "../../domain/entity/grid";
import { Sudoku } from "../../domain/entity/sudoku";
import {
  PlaySudokuUseCaseHandler,
  ReadSudokuUsecaseHandler,
} from "../../domain/usecase/sudoku";
import { Usecase } from "../../domain/usecase/usecase";
import { HookFactory } from "./hook-factory";

export const UseSudokuGameFactoryName = Symbol.for("UseSudokuGameFactory");

export class UseSudokuGameFactory implements HookFactory<UseSudokuGame> {
  constructor(
    private _readSudoku: Usecase<ReadSudokuUsecaseHandler>,
    private _playSudoku: Usecase<PlaySudokuUseCaseHandler>
  ) {}

  hook(): UseSudokuGame {
    return (id: string) => {
      const [sudoku, setSudoku] = useState<Sudoku>();

      useEffect(() => {
        (async () => {
          const sudoku = await this._readSudoku.handle(id);
          setSudoku(sudoku);
        })();
      }, []);

      const makeGuess = (row: number, column: number, value?: number) => {
        (async () => {
          const sudoku = await this._playSudoku.handle(id, row, column, value);
          setSudoku(sudoku);
        })();
      };

      const grid = sudoku
        ? UseSudokuGameFactory.convertSudoku(sudoku)
        : undefined;

      return { grid, makeGuess };
    };
  }

  private static convertSudoku(sudoku: Sudoku): ReadonlyGrid<SudokuSquareView> {
    return sudoku.grid.map((row) =>
      row.map((square) => ({ label: square.value?.toString() || "." }))
    );
  }
}

export type UseSudokuGame = (id: string) => UseSudokuGameResult;

interface UseSudokuGameResult {
  grid?: ReadonlyGrid<SudokuSquareView>;
  makeGuess: (row: number, column: number, value?: number) => void;
}

interface SudokuSquareView {
  label: string;
}
