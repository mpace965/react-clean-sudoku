import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useSudokuGame } from './core';
import { FixedSudokuSquare, OpenSudokuSquare } from './core/domain/entity/sudoku-square';

function App() {
  const { sudoku, makeGuess } = useSudokuGame("09b0f4b0-2b45-4beb-89e4-f60cc66cc39a");
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [value, setValue] = useState<number>();

  if (sudoku) {
    for (let i = 0; i < 9; i++) {
      let rowString = "";

      for (let j = 0; j < 9; j++) {
        const square = sudoku.grid[i][j];
        if (square instanceof FixedSudokuSquare) {
          rowString += `${square.value} `;
        }

        if (square instanceof OpenSudokuSquare) {
          rowString += `${square.value || '.'} `
        }
      }

      console.log(rowString);
    }
    console.log("\n\n")
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <input onBlur={(e) => setRow(parseInt(e.target.value))} />
        <input onBlur={(e) => setColumn(parseInt(e.target.value))} />
        <input onBlur={(e) => setValue(parseInt(e.target.value))} />
        <button onClick={() => makeGuess(row, column, value)}>Guess</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
