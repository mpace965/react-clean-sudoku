import { useEffect, useState } from "react";
import { ReadonlyGrid } from "../../domain/entity/grid";
import { Sudoku } from "../../domain/entity/sudoku";
import { FixedSudokuSquare } from "../../domain/entity/sudoku-square";
import {
  PlaySudokuUseCaseHandler,
  ReadSudokuUsecaseHandler,
} from "../../domain/usecase/sudoku";
import { Usecase } from "../../domain/usecase/usecase";

export function useSudokuGame(
  _readSudoku: Usecase<ReadSudokuUsecaseHandler>,
  _playSudoku: Usecase<PlaySudokuUseCaseHandler>,
  id: string
): UseSudokuGameResult {
  const [sudoku, setSudoku] = useState<Sudoku>();

  useEffect(() => {
    (async () => {
      const sudoku = await _readSudoku.handle(id);
      setSudoku(sudoku);
    })();
    // eslint-disable-next-line
  }, []);

  const makeGuess = (row: number, column: number, value?: string) => {
    (async () => {
      const sudoku = await _playSudoku.handle(
        id,
        row,
        column,
        value ? parseInt(value) : undefined
      );
      setSudoku(sudoku);
    })();
  };

  const grid = sudoku ? convertSudoku(sudoku) : undefined;

  return { grid, makeGuess };
}

function convertSudoku(sudoku: Sudoku): ReadonlyGrid<SudokuSquareView> {
  return sudoku.grid.map((row) =>
    row.map((square) => ({
      number: square.value ? square.value.toString() : "",
      readOnly: square instanceof FixedSudokuSquare,
    }))
  );
}

export interface UseSudokuGameResult {
  grid?: ReadonlyGrid<SudokuSquareView>;
  makeGuess: (row: number, column: number, value?: string) => void;
}

export interface SudokuSquareView {
  number?: string;
  readOnly: boolean;
}
