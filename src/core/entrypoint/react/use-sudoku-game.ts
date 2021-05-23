import { useEffect, useState } from "react";
import { ReadonlyGrid } from "../../domain/entity/grid";
import { Sudoku } from "../../domain/entity/sudoku";
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
  }, []);

  const makeGuess = (row: number, column: number, value?: number) => {
    (async () => {
      const sudoku = await _playSudoku.handle(id, row, column, value);
      setSudoku(sudoku);
    })();
  };

  const grid = sudoku ? convertSudoku(sudoku) : undefined;

  return { grid, makeGuess };
}

function convertSudoku(sudoku: Sudoku): ReadonlyGrid<SudokuSquareView> {
  return sudoku.grid.map((row) =>
    row.map((square) => ({ label: square.value?.toString() || "." }))
  );
}

export interface UseSudokuGameResult {
  grid?: ReadonlyGrid<SudokuSquareView>;
  makeGuess: (row: number, column: number, value?: number) => void;
}

interface SudokuSquareView {
  label: string;
}
