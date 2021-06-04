import React from "react";
import "./App.css";
import { useSudokuGame } from "../core";
import { Sudoku } from "./Sudoku";

export function App() {
  const { grid, makeGuess } = useSudokuGame(
    "09b0f4b0-2b45-4beb-89e4-f60cc66cc39a"
  );

  let sudoku;
  if (grid) {
    sudoku = <Sudoku grid={grid} onGuess={makeGuess} />;
  }

  return <div className="app">{sudoku}</div>;
}
