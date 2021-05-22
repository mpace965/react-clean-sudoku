import {
  ContainerModule,
  decorate,
  inject,
  injectable,
  interfaces,
} from "inversify";
import {
  PlaySudokuUseCaseName,
  ReadSudokuUsecaseName,
} from "../domain/usecase/sudoku";
import {
  HookFactory,
  UseSudoku,
  UseSudokuFactory,
  UseSudokuFactoryName,
  UseSudokuGame,
  UseSudokuGameFactory,
  UseSudokuGameFactoryName,
} from "../entrypoint/react";

decorate(injectable(), UseSudokuFactory);
decorate(
  inject(ReadSudokuUsecaseName) as ParameterDecorator,
  UseSudokuFactory,
  0
);

decorate(injectable(), UseSudokuGameFactory);
decorate(
  inject(ReadSudokuUsecaseName) as ParameterDecorator,
  UseSudokuGameFactory,
  0
);
decorate(
  inject(PlaySudokuUseCaseName) as ParameterDecorator,
  UseSudokuGameFactory,
  1
);

export const react = new ContainerModule((bind: interfaces.Bind) => {
  bind<HookFactory<UseSudoku>>(UseSudokuFactoryName).to(UseSudokuFactory);

  bind<HookFactory<UseSudokuGame>>(UseSudokuGameFactoryName).to(
    UseSudokuGameFactory
  );
});
