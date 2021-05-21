import {
  ContainerModule,
  interfaces,
  decorate,
  injectable,
  inject,
} from "inversify";
import {
  MemorySudokuGridRepository,
  SudokuGridRepositoryName,
} from "../data-provider/sudoku-grid";
import { SudokuGridSquares } from "../domain/entity/sudoku-grid";
import {
  CreateSudokuGridUsecase,
  CreateSudokuGridUsecaseName,
} from "../domain/usecase/sudoku-grid";
import { SudokuGridRepository } from "../domain/usecase/sudoku-grid/sudoku-grid-repository";
import { Usecase } from "../domain/usecase/usecase";

decorate(injectable(), MemorySudokuGridRepository);
decorate(injectable(), CreateSudokuGridUsecase);
decorate(
  inject(SudokuGridRepositoryName) as ParameterDecorator,
  CreateSudokuGridUsecase,
  0
);

export const sudokuGrid = new ContainerModule((bind: interfaces.Bind) => {
  bind<SudokuGridRepository>(SudokuGridRepositoryName).to(
    MemorySudokuGridRepository
  );

  bind<Usecase<SudokuGridSquares, Promise<string>>>(
    CreateSudokuGridUsecaseName
  ).to(CreateSudokuGridUsecase);
});