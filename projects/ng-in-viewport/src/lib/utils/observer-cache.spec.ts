import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Config } from '../values';

import { ObserverCache } from './observer-cache';

describe('GIVEN ObserverCache', () => {
  let mockCallback: IntersectionObserverCallback;

  beforeEach(() => {
    mockCallback = vi.fn();
  });

  describe('WHEN instance was created', () => {
    let instance: ObserverCache;

    beforeEach(() => {
      instance = new ObserverCache(mockCallback);
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

      it('THEN method should execute without errors', () => {
        expect(() => instance.addNode(node, config)).not.toThrow();
      });

      describe('AND `addNode` with another config was called', () => {
        const nextNode = createNode('div');
        const nextConfig = new Config({ rootMargin: '1px' });

        beforeEach(() => {
          instance.addNode(nextNode, nextConfig);
          instance.deleteNode(nextNode, nextConfig);
        });

        it('THEN methods should execute without errors', () => {
          expect(() => instance.addNode(nextNode, nextConfig)).not.toThrow();
          expect(() => instance.deleteNode(nextNode, nextConfig)).not.toThrow();
        });
      });

      describe('AND `deleteNode` method was called', () => {
        it('THEN method should execute without errors', () => {
          expect(() => instance.deleteNode(node, config)).not.toThrow();
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

      it('THEN methods should execute without errors', () => {
        expect(() => instance.addNode(node, config)).not.toThrow();
        expect(() => instance.deleteNode(node, config)).not.toThrow();
      });
    });
  });
});

function createNode(tagName: string): HTMLElement {
  return Object.assign(document.createElement(tagName), {
    classname: `c-${Date.now()}`,
  });
}
