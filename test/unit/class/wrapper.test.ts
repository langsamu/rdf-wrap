import type { BlankNode, Quad } from "@rdfjs/types";
import { DataFactory, Store, Parser } from "n3";
import { Parent } from "../fixture/parent";

let x: Parent;

beforeAll(() => {
  const rdf = `
  prefix : <https://example.org/>
  [
      :singularStringProperty "o1" ;
      :stringSetProperty "a", "b" ;
      :child [
          :name "name" ;
      ] ;
  ] .

  `;

  const dataset = new Store();

  dataset.addQuads(new Parser().parse(rdf));

  const triples = dataset.match();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const t = triples[Symbol.iterator]().next().value as Quad;
  const s = t.subject;

  x = new Parent(s as BlankNode, dataset, DataFactory);
});

describe("Wrapper", () => {
  it("has singular string", () => {
    expect(x.singularStringProperty).toBe("o1");
  });

  // it("has child object with name", () => {
  //   expect(x.singularProperty.name).toBe("name");
  // });

  // it("sets singular predicate to different value", () => {
  //   x.singularStringProperty = "o2";
  //   expect(x.singularStringProperty).toBe("o2");
  // });

  it("has strings in initiial dataset", () => {
    expect(x.stringSetProperty.size).toBe(2);
  });

  it("adds to strings in original dataset", () => {
    x.stringSetProperty.add("x");
    x.stringSetProperty.add("y");
    expect(x.stringSetProperty.size).toBe(4);
    expect(x.stringSetProperty.has("x") && x.stringSetProperty.has("y")).toBe(
      true
    );
  });
});
