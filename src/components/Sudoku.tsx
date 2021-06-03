import React from "react";
import { ReadonlyGrid, SudokuSquareView } from "../core";
import { SudokuSquare } from "./SudokuSquare";

export interface SudokuProps {
  onGuess: (rowIndex: number, columnIndex: number, guess?: string) => void;
  grid: ReadonlyGrid<SudokuSquareView>;
}

export function Sudoku(props: SudokuProps): JSX.Element {
  const { grid, onGuess } = props;

  const rows = grid.map(
    (row: ReadonlyArray<SudokuSquareView>, rowIndex: number) => {
      const squares = row.map(
        (square: SudokuSquareView, columnIndex: number) => {
          return (
            <SudokuSquare
              key={columnIndex}
              onGuess={(guess) => onGuess(rowIndex, columnIndex, guess)}
              {...square}
            />
          );
        }
      );
      return <div key={rowIndex}>{squares}</div>;
    }
  );

  return <div>{rows}</div>;
}
