import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  Literal,
  NamedNode,
  Quad,
  Variable
} from "@rdfjs/types";

export interface IWrapperConstructor<T> {
  new (
    term: BlankNode | NamedNode | Literal | Quad | Variable,
    dataset: DatasetCore,
    factory: DataFactory
  ): T;
}
