import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Config } from '../values';

import { ObserverCache } from './observer-cache';

// Create mock functions outside the mock
const mockObserverCacheItemConstructor = vi.fn();
const mockAddNode = vi.fn();
const mockDeleteNode = vi.fn();

// Mock ObserverCacheItem module
vi.mock('./observer-cache-item', () => ({
  ObserverCacheItem: mockObserverCacheItemConstructor.mockImplementation((config, callback) => {
    const { next, complete } = callback;

    return {
      addNode: mockAddNode.mockImplementation((_node: Element) => {
        next([{ target: _node } as IntersectionObserverEntry], {} as IntersectionObserver);
      }),
      deleteNode: mockDeleteNode.mockImplementation((_node: Element) => {
        complete();
      }),
    };
  }),
}));

describe('GIVEN ObserverCache', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('WHEN instance was created', () => {
    let callback: IntersectionObserverCallback;
    let instance: ObserverCache;

    beforeEach(() => {
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
