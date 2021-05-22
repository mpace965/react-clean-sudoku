import { ContainerModule, interfaces } from "inversify";
import { SudokuGrid } from "../domain/entity/sudoku-grid";
import { CreateSudokuGridUsecaseName } from "../domain/usecase/sudoku-grid";
import { Usecase } from "../domain/usecase/usecase";
import {
  UseSudokuGrid,
  useSudokuGridFactory,
  UseSudokuGridName,
} from "../entrypoint/react/useSudokuGridFactory";

export const react = new ContainerModule((bind: interfaces.Bind) => {
  bind<UseSudokuGrid>(UseSudokuGridName).toDynamicValue(
    (context: interfaces.Context) =>
      useSudokuGridFactory(
        context.container.get<Usecase<string, Promise<SudokuGrid>>>(
          CreateSudokuGridUsecaseName
        )
      )
  );
});
