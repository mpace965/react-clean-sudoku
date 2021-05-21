export interface Usecase<TInput, TOutput> {
  handle(input: TInput): TOutput;
}
