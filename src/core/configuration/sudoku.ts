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
import {
  CreateSudokuUsecase,
  CreateSudokuUsecaseHandler,
  CreateSudokuUsecaseName,
  PlaySudokuUseCase,
  PlaySudokuUseCaseHandler,
  PlaySudokuUseCaseName,
  ReadSudokuUsecase,
  ReadSudokuUsecaseHandler,
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

  bind<Usecase<CreateSudokuUsecaseHandler>>(CreateSudokuUsecaseName).to(
    CreateSudokuUsecase
  );

  bind<Usecase<PlaySudokuUseCaseHandler>>(PlaySudokuUseCaseName).to(
    PlaySudokuUseCase
  );

  bind<Usecase<ReadSudokuUsecaseHandler>>(ReadSudokuUsecaseName).to(
    ReadSudokuUsecase
  );
});
