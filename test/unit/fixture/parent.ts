
import { LiteralWrapper } from "../../../src/class/literal_wrapper";
import { PropertyWrapper } from "../../../src/class/property_wrapper";
import { SubjectWrapper } from "../../../src/class/subject_wrapper";
import { VOCABULARY } from "./vocabulary";

export class Parent extends SubjectWrapper {
  public get singularStringProperty(): string {
    const x = this.wrapProperty(VOCABULARY.hasSingularString, LiteralWrapper);
    if (x.size > 1) {
      throw new Error("Singular string has more than one value");
    }
    const [first] = x;
    return first.term.value;
  }

  // public set singularStringProperty(value: string) {
  //   setLiteral(
  //     this.term,
  //     this.dataset,
  //     this.factory,
  //     VOCABULARY.hasSingularString,
  //     value
  //   );
  // }

  public get stringSetProperty(): PropertyWrapper<LiteralWrapper> {
    return this.wrapProperty(VOCABULARY.hasStringSet, LiteralWrapper);
  }

  // public get singularProperty(): Child {
  //   return getter(
  //     this.term,
  //     this.dataset,
  //     this.factory,
  //     VOCABULARY.hasChild,
  //     Child
  //   );
  // }

  // public set singularProperty(value: Child) {
  //   setNode(this.term, this.dataset, this.factory, VOCABULARY.hasChild, value);
  // }
}
