import { InvalidThresholdException } from '../exceptions';

import { Threshold } from './threshold';

describe('GIVEN Threshold', () => {
  describe('WHEN created with number', () => {
    it('THEN value should return provided number wrapped in an array', () => {
      expect(new Threshold(0.5).value).toStrictEqual([0.5]);
    });
  });

  describe('WHEN created with array of numbers', () => {
    it('THEN value should return provided number wrapped in an array', () => {
      expect(new Threshold([0.25, 0.3]).value).toStrictEqual([0.25, 0.3]);
    });
  });

  describe('WHEN created with nullable value', () => {
    it('THEN value should return default value', () => {
      [null, undefined].forEach((val) => {
        expect(new Threshold(val).value).toStrictEqual([0, 1]);
      });
    });
  });

  describe('WHEN created with invalid value', () => {
    it('THEN exception should be thrown', () => {
      // @ts-expect-error unit testing
      expect(() => new Threshold('1')).toThrow(InvalidThresholdException);

      // @ts-expect-error unit testing
      expect(() => new Threshold(['1', '2'])).toThrow(InvalidThresholdException);
    });
  });
});
