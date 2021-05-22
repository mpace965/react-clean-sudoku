import {
  ContainerModule,
  decorate,
  inject,
  injectable,
  interfaces,
} from "inversify";
import { ReadSudokuGridUsecaseName } from "../domain/usecase/sudoku-grid/read";
import { HookFactory } from "../entrypoint/react/hook-factory";
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

export const react = new ContainerModule((bind: interfaces.Bind) => {
  bind<HookFactory<UseSudokuGrid>>(UseSudokuGridFactoryName).to(
    UseSudokuGridFactory
  );
});
