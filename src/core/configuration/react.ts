import {
  ContainerModule,
  decorate,
  inject,
  injectable,
  interfaces,
} from "inversify";
import { PlaySudokuUseCaseName } from "../domain/usecase/sudoku-grid/play";
import { ReadSudokuGridUsecaseName } from "../domain/usecase/sudoku-grid/read";
import { HookFactory } from "../entrypoint/react/hook-factory";
import {
  UseSudokuGame,
  UseSudokuGameFactory,
  UseSudokuGameFactoryName,
} from "../entrypoint/react/use-sudoku-game-factory";
import {
  UseSudokuGrid,
  UseSudokuGridFactory,
  UseSudokuGridFactoryName,
} from "../entrypoint/react/use-sudoku-grid-factory";

decorate(injectable(), UseSudokuGridFactory);
decorate(
  inject(ReadSudokuGridUsecaseName) as ParameterDecorator,
  UseSudokuGridFactory,
  0
);

decorate(injectable(), UseSudokuGameFactory);
decorate(
  inject(PlaySudokuUseCaseName) as ParameterDecorator,
  UseSudokuGameFactory,
  0
);
decorate(
  inject(ReadSudokuGridUsecaseName) as ParameterDecorator,
  UseSudokuGameFactory,
  1
);

export const react = new ContainerModule((bind: interfaces.Bind) => {
  bind<HookFactory<UseSudokuGrid>>(UseSudokuGridFactoryName).to(
    UseSudokuGridFactory
  );

  bind<HookFactory<UseSudokuGame>>(UseSudokuGameFactoryName).to(
    UseSudokuGameFactory
  );
});
