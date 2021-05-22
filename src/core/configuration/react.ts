import {
  ContainerModule,
  decorate,
  inject,
  injectable,
  interfaces,
} from "inversify";
import { PlaySudokuUseCaseName } from "../domain/usecase/sudoku/play";
import { ReadSudokuUsecaseName } from "../domain/usecase/sudoku/read";
import { HookFactory } from "../entrypoint/react/hook-factory";
import {
  UseSudokuGame,
  UseSudokuGameFactory,
  UseSudokuGameFactoryName,
} from "../entrypoint/react/use-sudoku-game-factory";
import {
  UseSudoku,
  UseSudokuFactory,
  UseSudokuFactoryName,
} from "../entrypoint/react/use-sudoku-factory";

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
