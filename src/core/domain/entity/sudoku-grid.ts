import { InvalidGridError } from "../error/invalid-grid-error";
import { InvalidSquareError } from "../error/invalid-square-error";
import {
  FixedSudokuSquare,
  OpenSudokuSquare,
  SudokuSquare,
} from "./sudoku-square";

export type SudokuGridSquares = Array<Array<SudokuSquare>>;

export class SudokuGrid {
  constructor(private _id: string, private _gridSquares: SudokuGridSquares) {
    if (_gridSquares.length !== 9) {
      throw new InvalidGridError(
        `Column length ${_gridSquares.length} is not valid, which must be 9.`
      );
    }

    _gridSquares.forEach((row: Array<SudokuSquare>, index) => {
      if (row.length !== 9) {
        throw new InvalidGridError(
          `Row length ${row.length} of row ${index} is not valid, which must be 9.`
        );
      }
    });
  }

  get id(): string {
    return this._id;
  }

  get grid(): ReadonlyArray<ReadonlyArray<Readonly<SudokuSquare>>> {
    return this._gridSquares;
  }

  guess(rowIndex: number, columnIndex: number, value?: number): void {
    const square = this._gridSquares[rowIndex][columnIndex];

    if (square instanceof FixedSudokuSquare) {
      throw new InvalidSquareError(
        `A guess cannot be made for the square at (${rowIndex}, ${columnIndex}), which is fixed.`
      );
    }

    square.value = value;
  }

  isSolved(): boolean {
    for (let index = 0; index < 9; index++) {
      if (!this.isSequenceSolved(this.row(index))) return false;
      if (!this.isSequenceSolved(this.column(index))) return false;
    }

    for (let columnIndex = 0; columnIndex < 9; columnIndex += 3) {
      for (let rowIndex = 0; rowIndex < 0; rowIndex += 3) {
        if (!this.isSequenceSolved(this.box(rowIndex, columnIndex)))
          return false;
      }
    }

    return true;
  }

  clear(): void {
    for (const square of this.eachSquare()) {
      if (square instanceof OpenSudokuSquare) {
        square.value = undefined;
      }
    }
  }

  private isSequenceSolved(sequence: IterableIterator<SudokuSquare>): boolean {
    const values = new Set<number>();

    for (const square of sequence) {
      if (square.value) {
        values.add(square.value);
      }
    }

    for (let value = 1; value <= 9; value++) {
      if (!values.has(value)) {
        return false;
      }
    }

    return true;
  }

  private *row(rowIndex: number): IterableIterator<SudokuSquare> {
    for (let columnIndex = 0; columnIndex < 9; columnIndex++) {
      yield this._gridSquares[rowIndex][columnIndex];
    }
  }

  private *column(columnIndex: number): IterableIterator<SudokuSquare> {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      yield this._gridSquares[rowIndex][columnIndex];
    }
  }

  private *box(
    rowIndex: number,
    columnIndex: number
  ): IterableIterator<SudokuSquare> {
    for (let columnOffset = 0; columnOffset < 3; columnOffset++) {
      for (let rowOffset = 0; rowOffset < 3; rowOffset++) {
        yield this._gridSquares[rowIndex + rowOffset][
          columnIndex + columnOffset
        ];
      }
    }
  }

  private *eachSquare(): IterableIterator<SudokuSquare> {
    for (let i = 0; i < 9; i++) {
      for (const square of this.row(i)) {
        yield square;
      }
    }
  }
}
