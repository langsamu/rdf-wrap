﻿import type { DataFactory, DatasetCore, Quad_Subject } from "@rdfjs/types";
import {
  getLiteral,
  getNode,
  stringFactory,
  Wrapper,
  WrappingSet,
} from "../../src/mod";
import { Child } from "./child";
import { VOCABULARY } from "./vocabulary";

export class Parent extends Wrapper {
  public static wrap(
    subject: Quad_Subject,
    dataset: DatasetCore,
    factory: DataFactory
  ): Parent {
    return new Parent(subject, dataset, factory);
  }

  public get singularStringProperty(): string {
    return getLiteral(
      this.subject,
      this.dataset,
      VOCABULARY.hasSingularString,
      stringFactory
    );
  }

  public set singularStringProperty(value: string) {
    this.setSingularString(VOCABULARY.hasSingularString, value);
  }

  public get stringSetProperty(): Set<string> {
    return new WrappingSet(
      this.subject,
      this.dataset,
      this.factory,
      VOCABULARY.hasStringSet,
      stringFactory
    );
  }

  public get singularProperty(): Child {
    return getNode(
      this.subject,
      this.dataset,
      this.factory,
      VOCABULARY.hasChild,
      Child.wrap.bind(this)
    );
  }

  public set singularProperty(value: Child) {
    this.setSingular(VOCABULARY.hasChild, value);
  }
}
