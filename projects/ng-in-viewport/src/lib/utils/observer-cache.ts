import { Config, configHash } from '../values';

import { ObserverCacheItem } from './observer-cache-item';

export class ObserverCache {
  static readonly #EMPTY_ROOT = Object.create(null) as Element;

  readonly #cache = new WeakMap<Element, Map<string, ObserverCacheItem>>();

  readonly #callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.#callback = callback;
  }

  public addNode(node: Element, config: Config): void {
    const items = this.#cache.get(config.root ?? ObserverCache.#EMPTY_ROOT) ?? this.create(config);
    const hash = config[configHash];

    // Scenario when configuration with new hash appears,
    // but root is already in cache.
    if (!items.has(hash)) {
      this.insert(items, config);
    }

    items.get(hash)!.addNode(node);
  }

  public deleteNode(node: Element, config: Config): void {
    const items = this.#cache.get(config.root ?? ObserverCache.#EMPTY_ROOT);
    const hash = config[configHash];

    if (items && items.has(hash)) {
      items.get(hash)!.deleteNode(node);
    }

    if (items && items.size === 0) {
      this.#cache.delete(config.root ?? ObserverCache.#EMPTY_ROOT);
    }
  }

  private create(config: Config): Map<string, ObserverCacheItem> {
    const items = new Map<string, ObserverCacheItem>();

    this.#cache.set(config.root ?? ObserverCache.#EMPTY_ROOT, items);

    this.insert(items, config);

    return items;
  }

  private insert(items: Map<string, ObserverCacheItem>, config: Config): void {
    const hash = config[configHash];

    const cacheItem = new ObserverCacheItem(config, {
      next: (...args) => {
        this.#callback(...args);
      },
      complete: () => {
        items.delete(hash);
      },
    });

    items.set(hash, cacheItem);
  }
}
