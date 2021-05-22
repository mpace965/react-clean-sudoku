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
  UseSudokuGame,
  UseSudokuGameFactory,
  UseSudokuGameFactoryName,
} from "../entrypoint/react";

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
  bind<HookFactory<UseSudokuGame>>(UseSudokuGameFactoryName).to(
    UseSudokuGameFactory
  );
});
