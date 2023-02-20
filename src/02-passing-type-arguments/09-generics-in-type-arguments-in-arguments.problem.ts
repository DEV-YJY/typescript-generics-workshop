import { expect, it } from "vitest";
import { Equal, Expect } from "../helpers/type-utils";

export class Component<T> {
  private props: T;

  constructor(props: T) {
    this.props = props;
  }

  getProps = () => this.props;
}

const cloneComponent = (component: T) => {
  return new Component(component.getProps());
};

it("Should clone the props from a passed-in Component", () => {
  const component = new Component({ a: 1, b: 2, c: 3 });

  const clonedComponent = cloneComponent(component);

  const result = clonedComponent.getProps();

  expect(result).toEqual({ a: 1, b: 2, c: 3 });

  type tests = [
    Expect<Equal<typeof result, { a: number; b: number; c: number }>>
  ];
});
