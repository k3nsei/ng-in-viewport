import { InvalidRootNodeException } from './invalid-root-node.exception';

describe('GIVEN InvalidRootNodeException', () => {
  describe('WHEN exception was thrown', () => {
    const throwException = () => {
      throw new InvalidRootNodeException();
    };

    it('THEN error should be instance of TypeError', () => {
      expect(throwException).toThrow(TypeError);
    });

    it('THEN error message should match', () => {
      const message = [
        'The provided value for the root is incorrect.',
        `The value must be of type '(Document or Element)'.`,
      ].join(' ');

      expect(throwException).toThrow(message);
    });
  });
});
