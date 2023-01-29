import { InvalidRootNodeException } from '../exceptions';

import { RootNode } from './root-node';

describe('GIVEN RootNode', () => {
  describe('WHEN created with DOM element node', () => {
    it('THEN value should match provided DOM element node', () => {
      const node = Object.assign(document.createElement('div'), {
        classname: `t-${Date.now()}`,
      });

      expect(new RootNode(node).value).toBe(node);
    });
  });

  describe('WHEN created with nullable value', () => {
    it('THEN value should return null', () => {
      expect(new RootNode(null).value).toBe(null);
      expect(new RootNode(undefined).value).toBe(null);
    });
  });

  describe('WHEN created with invalid value', () => {
    it('THEN exception should be thrown', () => {
      const node = document.createTextNode('lorem ipsum');

      // @ts-expect-error unit testing
      expect(() => new RootNode(node)).toThrow(InvalidRootNodeException);
      // @ts-expect-error unit testing
      expect(() => new RootNode('xyz')).toThrow(InvalidRootNodeException);
    });
  });
});
