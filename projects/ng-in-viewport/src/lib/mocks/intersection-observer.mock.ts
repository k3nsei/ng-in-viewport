import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const createDomRect = (options?: Partial<DOMRectReadOnly>): DOMRectReadOnly => {
  const { x = 0, y = 0, width = 0, height = 0, top = 0, bottom = 0, left = 0, right = 0 } = options || {};
  const data = { x, y, width, height, top, bottom, left, right } as const;

  return {
    ...data,
    toJSON: () => JSON.stringify(data),
  } satisfies DOMRectReadOnly;
};

export const mockIntersectionObserver = (
  trigger$: Subject<[Element, Partial<IntersectionObserverEntry>]>
): (() => void) => {
  const destroy$ = new ReplaySubject<void>(1);

  class MockedIntersectionObserver implements IntersectionObserver {
    public readonly root: Element | Document | null;

    public readonly rootMargin: string;

    public readonly thresholds: ReadonlyArray<number>;

    private readonly targets: Set<Element> = new Set();

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
      const { root = null, rootMargin = '0px 0px 0px 0px', threshold = [0] } = options ?? {};

      this.root = root;
      this.rootMargin = rootMargin;
      this.thresholds = Array.isArray(threshold) && threshold.length ? threshold : [threshold as number];

      trigger$
        .asObservable()
        .pipe(takeUntil(destroy$))
        .subscribe(([target, entry]: [Element, Partial<IntersectionObserverEntry>]) =>
          callback([this.createEntry(target, entry)], this)
        );
    }

    public observe(target: Element): void {
      this.targets.add(target);
    }

    public unobserve(target: Element): void {
      this.targets.delete(target);
    }

    public disconnect(): void {
      this.targets.clear();
    }

    public takeRecords(): IntersectionObserverEntry[] {
      return Array.from(this.targets).map((target: Element): IntersectionObserverEntry => this.createEntry(target, {}));
    }

    private createEntry(
      target: Element,
      entry: Partial<Omit<IntersectionObserverEntry, 'target'>> = {}
    ): IntersectionObserverEntry {
      return {
        target,
        intersectionRatio: 0,
        isIntersecting: false,
        rootBounds: this.root && createDomRect(),
        boundingClientRect: createDomRect(),
        intersectionRect: createDomRect(),
        time: Date.now(),
        ...entry,
      };
    }
  }

  const original = globalThis?.IntersectionObserver;

  Object.defineProperty(globalThis, 'IntersectionObserver', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: MockedIntersectionObserver,
  });

  return (): void => {
    destroy$.next();
    destroy$.complete();

    Object.defineProperty(globalThis, 'IntersectionObserver', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: original,
    });
  };
};
