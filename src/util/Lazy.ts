export class Lazy<T> {
  public value!: T;
  private readonly valueFactory: () => T;

  constructor(valueFactory: () => T) {
    this.valueFactory = valueFactory;
  }


}
