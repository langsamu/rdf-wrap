import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  Literal,
  NamedNode,
  Quad,
  Variable
} from "@rdfjs/types";

export abstract class Wrapper {
  public term;
  public dataset;
  public factory;

  public constructor(
    term: BlankNode | NamedNode | Literal | Quad | Variable,
    dataset: DatasetCore,
    factory: DataFactory
  ) {
    this.term = term;
    this.dataset = dataset;
    this.factory = factory;
  }
}
