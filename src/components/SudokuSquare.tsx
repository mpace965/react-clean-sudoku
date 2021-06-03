import React, { useState } from "react";
import classNames from "classnames";
import "./SudokuSquare.css";

export interface SudokuSquareProps {
  onGuess: (guess?: string) => void;
  readOnly?: boolean;
  number?: string;
}

export function SudokuSquare(props: SudokuSquareProps): JSX.Element {
  const { onGuess, number } = props;
  let { readOnly } = props;

  if (readOnly !== true) readOnly = false;

  const [value, setValue] = useState(number);

  function onKeyDown(event?: React.KeyboardEvent<HTMLInputElement>): void {
    if (!readOnly && event) {
      const { key } = event;

      if (key === "Backspace" || key === "Delete") {
        setValue("");
        onGuess(undefined);
        return;
      }

      const numberValue = parseInt(key);

      if (!isNaN(numberValue) && 1 <= numberValue && numberValue <= 9) {
        setValue(key);
        onGuess(key);
        return;
      }
    }
  }

  return (
    <input
      tabIndex={-1}
      className={classNames({ "sudoku-square": true, readonly: readOnly })}
      inputMode="numeric"
      pattern="[1-9]"
      readOnly={readOnly}
      value={value}
      onKeyDown={onKeyDown}
      onChange={() => {}} // Silence "no onChange with a value prop" warning
    />
  );
}
