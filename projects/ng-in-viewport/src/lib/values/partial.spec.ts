import { Partial } from './partial';

describe('GIVEN Partial', () => {
  describe('WHEN created with boolean value', () => {
    it('THEN value should match provided value', () => {
      const instance = new Partial(false);

      expect(instance.value).toBe(false);
    });
  });

  describe('WHEN created with nullable value', () => {
    it('THEN value should return true', () => {
      const instance = new Partial(null);

      expect(instance.value).toBe(true);
    });
  });

  describe('WHEN created with invalid value', () => {
    it('THEN exception should be thrown', () => {
      // @ts-expect-error unit testing
      const instance = new Partial('lorem-ipsum');

      expect(instance.value).toBe(true);
    });
  });
});
