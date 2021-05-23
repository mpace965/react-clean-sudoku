import { container } from "../configuration";
import {
  PlaySudokuUseCaseName,
  ReadSudokuUsecaseName,
} from "../domain/usecase/sudoku";
import {
  useSudokuGame as _useSudokuGame,
  UseSudokuGameResult,
} from "../entrypoint/react";

export const useSudokuGame = (id: string): UseSudokuGameResult =>
  _useSudokuGame(
    container.get(ReadSudokuUsecaseName),
    container.get(PlaySudokuUseCaseName),
    id
  );
