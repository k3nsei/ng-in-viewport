import { CheckFn } from './check-fn';

describe('GIVEN CheckFn', () => {
  describe('WHEN created with non-nullable value', () => {
    let instance: CheckFn;
    const fn = jest.fn();

    beforeEach(() => {
      instance = new CheckFn(fn);
    });

    it('THEN value should match provided fn', () => {
      expect(instance.value).toBe(fn);
    });

    it('THEN id should not be empty', () => {
      expect(instance.id?.startsWith('in-viewport-check-fn')).toBe(true);
    });
  });

  describe('WHEN created with nullable value', () => {
    let instance: CheckFn;
    const fn = null;

    beforeEach(() => {
      instance = new CheckFn(fn);
    });

    it('THEN value should be empty', () => {
      expect(instance.value).toBe(undefined);
    });

    it('THEN id should return empty fallback', () => {
      expect(instance.id).toBe('in-viewport-empty-check-fn');
    });
  });
});
