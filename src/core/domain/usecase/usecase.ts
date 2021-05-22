export interface Usecase<TFunction extends (...args: Array<any>) => any> {
  handle: TFunction;
}
