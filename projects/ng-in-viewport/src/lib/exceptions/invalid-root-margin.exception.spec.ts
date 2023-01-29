import { InvalidRootMarginException } from './invalid-root-margin.exception';

describe('GIVEN InvalidRootMarginException', () => {
  describe('WHEN exception was thrown', () => {
    const throwException = () => {
      throw new InvalidRootMarginException();
    };

    it('THEN error should be instance of TypeError', () => {
      expect(throwException).toThrow(TypeError);
    });

    it('THEN error message should match', () => {
      const message = [
        'The provided value for the rootMargin is incorrect.',
        'The value must be specified in pixels or percent.',
      ].join(' ');

      expect(throwException).toThrow(message);
    });
  });
});
