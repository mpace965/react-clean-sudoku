import {
  ContainerModule,
  decorate,
  inject,
  injectable,
  interfaces,
} from "inversify";
import { ReadSudokuGridUsecase } from "../domain/usecase/sudoku-grid/read";
import { HookFactory } from "../entrypoint/react/HookFactory";
import {
  UseSudokuGrid,
  UseSudokuGridFactory,
  UseSudokuGridFactoryName,
} from "../entrypoint/react/UseSudokuGridFactory";

decorate(injectable(), UseSudokuGridFactory);
decorate(
  inject(ReadSudokuGridUsecase) as ParameterDecorator,
  UseSudokuGridFactory,
  0
);

export const react = new ContainerModule((bind: interfaces.Bind) => {
  bind<HookFactory<UseSudokuGrid>>(UseSudokuGridFactoryName).to(
    UseSudokuGridFactory
  );
});
