import React, { useState } from "react";

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

  function onChange(event?: React.ChangeEvent<HTMLInputElement>): void {
    if (!readOnly && event) {
      const { value: eventValue } = event.target;

      if (eventValue === "") {
        setValue(eventValue);
        onGuess(undefined);
        return;
      }

      const numberValue = parseInt(eventValue);

      if (!isNaN(numberValue) && 1 <= numberValue && numberValue <= 9) {
        setValue(eventValue);
        onGuess(eventValue);
        return;
      }
    }
  }

  return (
    <input
      inputMode="numeric"
      pattern="[1-9]"
      readOnly={readOnly}
      value={value}
      onChange={onChange}
    />
  );
}
