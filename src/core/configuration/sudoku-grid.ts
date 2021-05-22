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
import { SudokuGrid, SudokuGridSquares } from "../domain/entity/sudoku-grid";
import {
  CreateSudokuGridUsecase,
  CreateSudokuGridUsecaseName,
} from "../domain/usecase/sudoku-grid";
import {
  PlaySudokuInput,
  PlaySudokuUseCase,
  PlaySudokuUseCaseName,
} from "../domain/usecase/sudoku-grid/play";
import {
  ReadSudokuGridUsecase,
  ReadSudokuGridUsecaseName,
} from "../domain/usecase/sudoku-grid/read";
import { SudokuGridRepository } from "../domain/usecase/sudoku-grid/sudoku-grid-repository";
import { Usecase } from "../domain/usecase/usecase";

decorate(injectable(), MemorySudokuGridRepository);

decorate(injectable(), CreateSudokuGridUsecase);
decorate(
  inject(SudokuGridRepositoryName) as ParameterDecorator,
  CreateSudokuGridUsecase,
  0
);

decorate(injectable(), ReadSudokuGridUsecase);
decorate(
  inject(SudokuGridRepositoryName) as ParameterDecorator,
  ReadSudokuGridUsecase,
  0
);

decorate(injectable(), PlaySudokuUseCase);
decorate(
  inject(SudokuGridRepositoryName) as ParameterDecorator,
  PlaySudokuUseCase,
  0
);

export const sudokuGrid = new ContainerModule((bind: interfaces.Bind) => {
  bind<SudokuGridRepository>(SudokuGridRepositoryName).to(
    MemorySudokuGridRepository
  );

  bind<Usecase<SudokuGridSquares, Promise<string>>>(
    CreateSudokuGridUsecaseName
  ).to(CreateSudokuGridUsecase);

  bind<Usecase<string, Promise<SudokuGrid>>>(ReadSudokuGridUsecaseName).to(
    ReadSudokuGridUsecase
  );

  bind<Usecase<PlaySudokuInput, Promise<SudokuGrid>>>(PlaySudokuUseCaseName).to(
    PlaySudokuUseCase
  );
});
