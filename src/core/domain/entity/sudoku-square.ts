import { ArgumentError } from "../error/argument-error";

export type SudokuSquare = FixedSudokuSquare | OpenSudokuSquare;

export class FixedSudokuSquare {
  constructor(private _value: number) {
    if (!isSudokuNumber(_value)) {
      throw new ArgumentError(
        `Value ${_value} is not a valid sudoku number, which must be an integer between 1 and 9, inclusive.`
      );
    }
  }

  get value(): number {
    return this._value;
  }
}

export class OpenSudokuSquare {
  constructor(private _value?: number) {
    if (_value && !isSudokuNumber(_value)) {
      throw new ArgumentError(
        `Value ${_value} is not a valid sudoku number, which must be an integer between 1 and 9, inclusive.`
      );
    }
  }

  get value(): number | undefined {
    return this._value;
  }

  set value(value: number | undefined) {
    if (value !== undefined && !isSudokuNumber(value)) {
      throw new ArgumentError(
        `Value ${value} is not a valid sudoku number, which must be an integer between 1 and 9, inclusive.`
      );
    }

    this._value = value;
  }
}

function isSudokuNumber(value: number): boolean {
  return 1 <= value && value <= 9;
}
