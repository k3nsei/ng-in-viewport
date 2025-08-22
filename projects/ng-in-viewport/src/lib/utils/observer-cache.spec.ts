import { vi } from 'vitest';

import { Config } from '../values';

import { ObserverCache } from './observer-cache';
import { ObserverCacheItem } from './observer-cache-item';

// Global mock instances to track all calls
const mockInstances: Array<{
  addNode: ReturnType<typeof vi.fn>;
  deleteNode: ReturnType<typeof vi.fn>;
}> = [];

vi.mock('./observer-cache-item', () => ({
  ObserverCacheItem: vi.fn().mockImplementation((...args: ConstructorParameters<typeof ObserverCacheItem>) => {
    const { next, complete } = args[1];
    const nodes = new Set<Element>();

    const addNodeMock = vi.fn().mockImplementation((node: Element) => {
      nodes.add(node);
      next([{ target: node } as IntersectionObserverEntry], {} as IntersectionObserver);
    });

    const deleteNodeMock = vi.fn().mockImplementation((node: Element) => {
      nodes.delete(node);
      complete();
    });

    const instance = {
      addNode: addNodeMock,
      deleteNode: deleteNodeMock,
    };

    mockInstances.push(instance);
    return instance;
  }),
}));

// Helper functions to check if any mock instance was called with the node
function expectAnyAddNodeCalledWith(node: Element) {
  const wasCalled = mockInstances.some((instance) => instance.addNode.mock.calls.some((call) => call[0] === node));
  expect(wasCalled).toBe(true);
}

function expectAnyDeleteNodeCalledWith(node: Element) {
  const wasCalled = mockInstances.some((instance) => instance.deleteNode.mock.calls.some((call) => call[0] === node));
  expect(wasCalled).toBe(true);
}

describe('GIVEN ObserverCache', () => {
  describe('WHEN instance was created', () => {
    let callback: IntersectionObserverCallback;
    let instance: ObserverCache;

    beforeEach(() => {
      // Clear all mock instances
      mockInstances.length = 0;
      callback = vi.fn();
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
        expectAnyAddNodeCalledWith(node);
      });

      describe('AND `addNode` with another config was called', () => {
        const nextNode = createNode('div');
        const nextConfig = new Config({ rootMargin: '1px' });

        beforeEach(() => {
          instance.addNode(nextNode, nextConfig);
          instance.deleteNode(nextNode, nextConfig);
        });

        it('THEN `addNode` from ObserverCacheItem should be called', () => {
          expectAnyAddNodeCalledWith(nextNode);
        });

        it('THEN `deleteNode` from ObserverCacheItem should be called', () => {
          expectAnyDeleteNodeCalledWith(nextNode);
        });
      });

      describe('AND `deleteNode` method was called', () => {
        it('THEN `deleteNode` from ObserverCacheItem should be called', () => {
          instance.deleteNode(node, config);

          expectAnyDeleteNodeCalledWith(node);
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
        expectAnyAddNodeCalledWith(node);
      });

      it('THEN `deleteNode` from ObserverCacheItem should be called', () => {
        expectAnyDeleteNodeCalledWith(node);
      });
    });
  });
});

function createNode(tagName: string): HTMLElement {
  return Object.assign(document.createElement(tagName), {
    classname: `c-${Date.now()}`,
  });
}
