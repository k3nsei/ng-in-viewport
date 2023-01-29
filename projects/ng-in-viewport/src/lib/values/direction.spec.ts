import { InViewportDirection } from '../enums';
import { InvalidDirectionException } from '../exceptions';

import { Direction } from './direction';

describe('GIVEN Direction', () => {
  describe('WHEN created with value from `InViewportDirection`', () => {
    it('THEN value should match provided value', () => {
      const instance = new Direction(InViewportDirection.HORIZONTAL);

      expect(instance.value).toBe(InViewportDirection.HORIZONTAL);
    });
  });

  describe('WHEN created with nullable value', () => {
    it('THEN exception should be thrown', () => {
      // @ts-expect-error unit testing
      expect(() => new Direction(null)).toThrow(InvalidDirectionException);
    });
  });

  describe('WHEN created with invalid value', () => {
    it('THEN exception should be thrown', () => {
      // @ts-expect-error unit testing
      expect(() => new Direction('lorem-ipsum')).toThrow(InvalidDirectionException);
    });
  });
});
