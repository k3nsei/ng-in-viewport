import { InvalidRootNodeException } from '../exceptions';

export class RootNode {
  readonly #value: Element | null;

  public get value(): Element | null {
    return this.#value;
  }

  constructor(node: Element | Document | null | undefined) {
    this.#value = RootNode.validate(node);
  }

  private static validate(node: unknown): Element | null {
    if (node === null || node === undefined) {
      return null;
    }

    if (node instanceof Element && node.nodeType === Node.ELEMENT_NODE) {
      return node;
    }

    throw new InvalidRootNodeException();
  }
}
