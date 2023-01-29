import { InvalidThresholdException } from './invalid-threshold.exception';

describe('GIVEN InvalidThresholdException', () => {
  describe('WHEN exception was thrown', () => {
    const throwException = () => {
      throw new InvalidThresholdException();
    };

    it('THEN error should be instance of TypeError', () => {
      expect(throwException).toThrow(TypeError);
    });

    it('THEN error message should match', () => {
      const message = [
        'The provided values for the threshold are incorrect.',
        'The values must be numbers between 0 and 1.',
      ].join(' ');

      expect(throwException).toThrow(message);
    });
  });
});
