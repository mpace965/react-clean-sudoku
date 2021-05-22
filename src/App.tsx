import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AsyncState, useSudokuGrid } from './core';

function App() {
  const result = useSudokuGrid("09b0f4b0-2b45-4beb-89e4-f60cc66cc39a");
  let component = undefined;
  if (result.asyncState === AsyncState.PENDING) {
    component = <p>Loading</p>
  }

  if (result.asyncState === AsyncState.REJECTED) {
    component = <p>Error</p>
  }

  if (result.asyncState === AsyncState.FULFILLED) {
    component = <p>{result.grid.id}</p>
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {component}
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
