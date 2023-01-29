import { Config } from '../values';

import { ObserverCache } from './observer-cache';
import { ObserverCacheItem } from './observer-cache-item';

let mockAddNode: (node: Element) => void;
let mockDeleteNode: (node: Element) => void;

jest.mock('./observer-cache-item', () => ({
  ObserverCacheItem: jest.fn().mockImplementation((...args: ConstructorParameters<typeof ObserverCacheItem>) => {
    const { next, complete } = args[1];
    const nodes = new Set<Element>();

    mockAddNode = jest.fn().mockImplementation((node: Element) => {
      nodes.add(node);
      next([{ target: node } as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    mockDeleteNode = jest.fn().mockImplementation((node: Element) => {
      nodes.delete(node);
      complete();
    });

    return {
      addNode: mockAddNode,
      deleteNode: mockDeleteNode,
    };
  }),
}));

describe('GIVEN ObserverCache', () => {
  describe('WHEN instance was created', () => {
    let callback: IntersectionObserverCallback;
    let instance: ObserverCache;

    beforeEach(() => {
      callback = jest.fn();
      instance = new ObserverCache(callback);
    });

    it('THEN instance should exists', () => {
      expect(instance).toBeTruthy();
    });

    describe('AND `addNode` method was called with config containing empty root', () => {
      const node = createNode('div');
      const config = new Config();

      beforeEach(() => {
        instance.addNode(node, config);
      });

      it('THEN `addNode` from ObserverCacheItem should be called', () => {
        expect(mockAddNode).toHaveBeenCalledWith(node);
      });

      describe('AND `addNode` with another config was called', () => {
        const nextNode = createNode('div');
        const nextConfig = new Config({ rootMargin: '1px' });

        beforeEach(() => {
          instance.addNode(nextNode, nextConfig);
          instance.deleteNode(nextNode, nextConfig);
        });

        it('THEN `addNode` from ObserverCacheItem should be called', () => {
          expect(mockAddNode).toHaveBeenCalledWith(nextNode);
        });

        it('THEN `deleteNode` from ObserverCacheItem should be called', () => {
          expect(mockDeleteNode).toHaveBeenCalledWith(nextNode);
        });
      });

      describe('AND `deleteNode` method was called', () => {
        it('THEN `deleteNode` from ObserverCacheItem should be called', () => {
          instance.deleteNode(node, config);

          expect(mockDeleteNode).toHaveBeenCalledWith(node);
        });
      });
    });

    describe('AND `addNode` and `deleteNode` method was called with config containing root node', () => {
      const rootNode = createNode('div');
      const node = createNode('div');
      const config = new Config({ root: rootNode });

      beforeEach(() => {
        instance.addNode(node, config);
        instance.deleteNode(node, config);
      });

      it('THEN `addNode` from ObserverCacheItem should be called', () => {
        expect(mockAddNode).toHaveBeenCalledWith(node);
      });

      it('THEN `deleteNode` from ObserverCacheItem should be called', () => {
        expect(mockDeleteNode).toHaveBeenCalledWith(node);
      });
    });
  });
});

function createNode(tagName: string): HTMLElement {
  return Object.assign(document.createElement(tagName), {
    classname: `c-${Date.now()}`,
  });
}
