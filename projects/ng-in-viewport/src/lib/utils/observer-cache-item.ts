import { Config } from '../values';

export class ObserverCacheItem {
  readonly #nodes = new Set<Element>();

  readonly #observer: IntersectionObserver;

  readonly #destroy: () => void;

  constructor(config: Config, callback: { next: IntersectionObserverCallback; complete: () => void }) {
    this.#observer = new IntersectionObserver(
      (...args) => {
        callback.next(...args);
      },
      {
        root: config.root,
        rootMargin: config.rootMargin,
        threshold: [...config.threshold],
      }
    );

    this.#destroy = () => {
      this.#observer.disconnect();
      callback.complete();
    };
  }

  public addNode(node: Element): void {
    this.#nodes.add(node);
    this.#observer.observe(node);
  }

  public deleteNode(node: Element): void {
    this.#nodes.delete(node);
    this.#nodes.size ? this.#observer.unobserve(node) : this.#destroy();
  }
}
