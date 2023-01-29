import { isObject } from './is-object';

describe('GIVEN isObject', () => {
  describe('WHEN called with plain object', () => {
    it('THEN return true', () => {
      expect(isObject({})).toBe(true);
    });
  });

  describe('WHEN called with class instance', () => {
    it('THEN return true', () => {
      const instance = new (class Foo {})();

      expect(isObject(instance)).toBe(true);
    });
  });

  describe('WHEN called invalid values', () => {
    it('THEN return false', () => {
      [
        undefined,
        null,
        'foo bar',
        1,
        Number.NaN,
        Symbol(),
        [],
        new Set(),
        new Map(),
        () => {
          return;
        },
      ].forEach((val) => {
        expect(isObject(val)).toBe(false);
      });
    });
  });
});
