import type {
  BlankNode,
  DataFactory,
  DatasetCore,
  NamedNode,
  Quad,
  Variable
} from "@rdfjs/types";
import type { IWrapperConstructor } from "../types/i_wrapper_constructor";
import { PropertyWrapper } from "./property_wrapper";
import { Wrapper } from "./wrapper";

export abstract class SubjectWrapper extends Wrapper {
  public term;

  public constructor(
    term: BlankNode | NamedNode | Quad | Variable,
    dataset: DatasetCore,
    factory: DataFactory
  ) {
    super(term, dataset, factory);
    this.term = term;
  }

  wrapProperty<T extends Wrapper>(
    property: Variable | NamedNode,
    wrapper: IWrapperConstructor<T>
  ): PropertyWrapper<T> {
    return new PropertyWrapper<T>(this, property, wrapper);
  }
}
