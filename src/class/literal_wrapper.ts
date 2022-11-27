import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  Literal,
  NamedNode,
  Quad,
  Variable
} from "@rdfjs/types";
import { Wrapper } from "./wrapper";

export class LiteralWrapper extends Wrapper {
  public term;

  public constructor(
    term: BlankNode | NamedNode | Literal | Quad | Variable,
    dataset: DatasetCore,
    factory: DataFactory
  ) {
    if (term.termType === "BlankNode" || term.termType === "NamedNode" || term.termType === "Quad" || term.termType === "Variable") {
      throw new Error(`Expected a Literal got a ${term.termType}`);
    }
    super(term, dataset, factory);
    this.term = term;
  }
}
