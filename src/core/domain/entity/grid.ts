export type Grid<TElement> = Array<Array<TElement>>;

export type ReadonlyGrid<TElement> = ReadonlyArray<
  ReadonlyArray<Readonly<TElement>>
>;
