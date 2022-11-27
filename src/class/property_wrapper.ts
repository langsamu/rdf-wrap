import type {
  BlankNode,
  Variable,
  Quad,
  NamedNode,
  Literal
} from "@rdfjs/types";
import type { IWrapperConstructor } from "../types/i_wrapper_constructor";
import type { Wrapper } from "./wrapper";

export class PropertyWrapper<T extends Wrapper> implements Set<T> {
  public term;
  protected dataset;
  protected factory;
  protected property;
  protected wrapperFactory;

  constructor(
    wrapper: Wrapper,
    property: Variable | NamedNode,
    wrapperFactory: IWrapperConstructor<T>
  ) {
    if (wrapper.term.termType === "Literal") {
      throw new Error("Cannot property wrap a Literal Node");
    }

    this.term = wrapper.term;
    this.dataset = wrapper.dataset;
    this.factory = wrapper.factory;
    this.property = property;
    this.wrapperFactory = wrapperFactory;
  }

  public add(value: T | string | number): this {
    const q = this.factory.quad(this.term, this.property, this.convert(value));
    this.dataset.add(q);
    return this;
  }

  public clear(): void {
    for (const q of this.dataset.match(this.term, this.property)) {
      this.dataset.delete(q);
    }
  }

  public delete(value: T): boolean {
    if (!this.has(value)) {
      return false;
    }

    for (const q of this.dataset.match(
      this.term,
      this.property,
      this.convert(value)
    )) {
      this.dataset.delete(q);
    }
    return true;
  }

  public forEach(
    callbackfn: (item: T, index: T, set: Set<T>) => void,
    thisArg?: unknown
  ): void {
    for (const item of this) {
      callbackfn.call(thisArg, item, item, this);
    }
  }

  public has(value: T | string | number): boolean {
    return this.dataset.has(
      this.factory.quad(this.term, this.property, this.convert(value))
    );
  }

  public get size(): number {
    return Array.from(this).length;
  }

  public [Symbol.iterator](): IterableIterator<T> {
    return this.values();
  }

  public *entries(): IterableIterator<[T, T]> {
    for (const t of this) {
      yield [t, t];
    }
  }

  public keys(): IterableIterator<T> {
    return this.values();
  }

  public *values(): IterableIterator<T> {
    for (const q of this.dataset.match(this.term, this.property)) {
      if (
        q.object.termType !== "BlankNode" &&
        q.object.termType !== "NamedNode" &&
        q.object.termType !== "Literal"
      ) {
        throw new Error("Term must be a BlankNode, NamedNode or Literal");
      }
      yield new this.wrapperFactory(q.object, this.dataset, this.factory);
    }
  }

  public get [Symbol.toStringTag](): string {
    return `collection wrapper for subject ${this.term.value} predicate ${this.property.value}`;
  }

  private convert(value: T | string | number): BlankNode | NamedNode | Literal | Quad | Variable {
    switch (typeof value) {
      case "string":
        return this.factory.literal(value);

      case "number":
        return this.factory.literal(
          value.toString(),
          this.factory.namedNode("xsd:int")
        );

      default:
        return value.term;
    }
  }
}
