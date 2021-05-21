import { Usecase } from "../usecase";
import { SudokuGrid, SudokuGridSquares } from "../../entity/sudoku-grid";
import { SudokuGridRepository } from "./sudoku-grid-repository";
import { v4 as uuidv4 } from "uuid";

export class CreateSudokuGrid
  implements Usecase<SudokuGridSquares, Promise<string>> {
  constructor(private _sudokuGridRepository: SudokuGridRepository) {}

  async handle(gridSquares: SudokuGridSquares): Promise<string> {
    const sudokuGrid = new SudokuGrid(uuidv4(), gridSquares);

    await this._sudokuGridRepository.create(sudokuGrid);

    return sudokuGrid.id;
  }
}
