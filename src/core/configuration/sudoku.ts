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
import { Sudoku, SudokuGrid } from "../domain/entity/sudoku";
import {
  CreateSudokuUsecase,
  CreateSudokuUsecaseName,
} from "../domain/usecase/sudoku";
import {
  PlaySudokuInput,
  PlaySudokuUseCase,
  PlaySudokuUseCaseName,
} from "../domain/usecase/sudoku/play";
import {
  ReadSudokuUsecase,
  ReadSudokuUsecaseName,
} from "../domain/usecase/sudoku/read";
import { SudokuRepository } from "../domain/usecase/sudoku/sudoku-repository";
import { Usecase } from "../domain/usecase/usecase";

decorate(injectable(), MemorySudokuRepository);

decorate(injectable(), CreateSudokuUsecase);
decorate(
  inject(SudokuRepositoryName) as ParameterDecorator,
  CreateSudokuUsecase,
  0
);

decorate(injectable(), ReadSudokuUsecase);
decorate(
  inject(SudokuRepositoryName) as ParameterDecorator,
  ReadSudokuUsecase,
  0
);

decorate(injectable(), PlaySudokuUseCase);
decorate(
  inject(SudokuRepositoryName) as ParameterDecorator,
  PlaySudokuUseCase,
  0
);

export const sudoku = new ContainerModule((bind: interfaces.Bind) => {
  bind<SudokuRepository>(SudokuRepositoryName).to(MemorySudokuRepository);

  bind<Usecase<SudokuGrid, Promise<string>>>(CreateSudokuUsecaseName).to(
    CreateSudokuUsecase
  );

  bind<Usecase<string, Promise<Sudoku>>>(ReadSudokuUsecaseName).to(
    ReadSudokuUsecase
  );

  bind<Usecase<PlaySudokuInput, Promise<Sudoku>>>(PlaySudokuUseCaseName).to(
    PlaySudokuUseCase
  );
});
