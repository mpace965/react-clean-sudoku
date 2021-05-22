import {
  ContainerModule,
  interfaces,
  decorate,
  injectable,
  inject,
} from "inversify";
import {
  MemorySudokuRepository,
  SudokuRepositoryName,
} from "../data-provider/sudoku";
import { Grid } from "../domain/entity/grid";
import { Sudoku } from "../domain/entity/sudoku";
import { SudokuSquare } from "../domain/entity/sudoku-square";
import {
  CreateSudokuUsecase,
  CreateSudokuUsecaseName,
  PlaySudokuInput,
  PlaySudokuUseCase,
  PlaySudokuUseCaseName,
  ReadSudokuUsecase,
  ReadSudokuUsecaseName,
  SudokuRepository,
} from "../domain/usecase/sudoku";
import { Usecase } from "../domain/usecase/usecase";

decorate(injectable(), MemorySudokuRepository);

decorate(injectable(), CreateSudokuUsecase);
decorate(
  inject(SudokuRepositoryName) as ParameterDecorator,
  CreateSudokuUsecase,
  0
);

decorate(injectable(), PlaySudokuUseCase);
decorate(
  inject(SudokuRepositoryName) as ParameterDecorator,
  PlaySudokuUseCase,
  0
);

decorate(injectable(), ReadSudokuUsecase);
decorate(
  inject(SudokuRepositoryName) as ParameterDecorator,
  ReadSudokuUsecase,
  0
);

export const sudoku = new ContainerModule((bind: interfaces.Bind) => {
  bind<SudokuRepository>(SudokuRepositoryName).to(MemorySudokuRepository);

  bind<Usecase<Grid<SudokuSquare>, Promise<string>>>(
    CreateSudokuUsecaseName
  ).to(CreateSudokuUsecase);

  bind<Usecase<PlaySudokuInput, Promise<Sudoku>>>(PlaySudokuUseCaseName).to(
    PlaySudokuUseCase
  );

  bind<Usecase<string, Promise<Sudoku>>>(ReadSudokuUsecaseName).to(
    ReadSudokuUsecase
  );
});
