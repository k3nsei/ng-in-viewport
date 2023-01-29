import { Config } from '../values';

import { ObserverCacheItem } from './observer-cache-item';

const intersectionObserver = globalThis.IntersectionObserver;

describe('GIVEN ObserverCacheItem', () => {
  let mockObserve: typeof IntersectionObserver.prototype.observe;
  let mockUnobserve: typeof IntersectionObserver.prototype.unobserve;
  let mockDisconnect: typeof IntersectionObserver.prototype.disconnect;

  beforeEach(() => {
    globalThis.IntersectionObserver = jest.fn().mockImplementation((callback: IntersectionObserverCallback) => {
      mockObserve = jest.fn().mockImplementation((node: Element) => {
        callback([{ target: node } as IntersectionObserverEntry], {} as IntersectionObserver);
      });
      mockUnobserve = jest.fn();
      mockDisconnect = jest.fn();

      return {
        observe: mockObserve,
        unobserve: mockUnobserve,
        disconnect: mockDisconnect,
      };
    });
  });

  afterEach(() => {
    globalThis.IntersectionObserver = intersectionObserver;
  });

  describe('WHEN instance was created', () => {
    let instance: ObserverCacheItem;
    let mockNext: IntersectionObserverCallback;
    let mockComplete: () => void;

    beforeEach(() => {
      mockNext = jest.fn();
      mockComplete = jest.fn();

      instance = new ObserverCacheItem(new Config(), { next: mockNext, complete: mockComplete });
    });

    it('THEN instance should exists', () => {
      expect(instance).toBeTruthy();
    });

    describe('AND `addNode` method was called', () => {
      const node = createNode('div');

      beforeEach(() => {
        instance.addNode(node);
      });

      it('THEN `observe` from IntersectionObserver should be called', () => {
        expect(mockObserve).toHaveBeenCalledWith(node);
      });

      describe('AND `addNode` method was called with another nextNode', () => {
        const nextNode = createNode('div');

        beforeEach(() => {
          instance.addNode(nextNode);
        });

        it('THEN `observe` from IntersectionObserver should be called', () => {
          expect(mockObserve).toHaveBeenCalledWith(nextNode);
        });

        describe('AND `deleteNode` method was called with nextNode', () => {
          it('THEN `unobserve` from IntersectionObserver should be called', () => {
            instance.deleteNode(nextNode);

            expect(mockUnobserve).toHaveBeenCalledWith(nextNode);
          });
        });

        describe('AND `deleteNode` method was called with all nodes', () => {
          it('THEN `disconnect` from IntersectionObserver should be called', () => {
            instance.deleteNode(node);
            instance.deleteNode(nextNode);

            expect(mockDisconnect).toHaveBeenCalledTimes(1);
          });
        });
      });
    });
  });
});

function createNode(tagName: string): HTMLElement {
  return Object.assign(document.createElement(tagName), {
    classname: `c-${Date.now()}`,
  });
}
