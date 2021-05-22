import { useEffect, useState } from "react";
import { Sudoku } from "../../domain/entity/sudoku";
import { PlaySudokuInput } from "../../domain/usecase/sudoku/play";
import { Usecase } from "../../domain/usecase/usecase";
import { HookFactory } from "./hook-factory";

export const UseSudokuGameFactoryName = Symbol.for("UseSudokuGameFactory");

export class UseSudokuGameFactory implements HookFactory<UseSudokuGame> {
  constructor(
    private _readSudoku: Usecase<string, Promise<Sudoku>>,
    private _playSudoku: Usecase<PlaySudokuInput, Promise<Sudoku>>
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
          const sudoku = await this._playSudoku.handle({
            id,
            row,
            column,
            value,
          });
          setSudoku(sudoku);
        })();
      };

      return { sudoku, makeGuess };
    };
  }
}

export type UseSudokuGame = (id: string) => UseSudokuGameResult;

interface UseSudokuGameResult {
  sudoku?: Sudoku;
  makeGuess: (row: number, column: number, value?: number) => void;
}
