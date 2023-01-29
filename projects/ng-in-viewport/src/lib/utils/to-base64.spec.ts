import { toBase64 } from './to-base64';

describe('GIVEN toBase64', () => {
  describe('WHEN called with `abcd`', () => {
    it('THEN result should match', () => {
      expect(toBase64('abcd')).toBe('YWJjZA==');
    });
  });

  describe('WHEN called with invalid value', () => {
    it('THEN return back what was passed', () => {
      const value = Symbol();

      // @ts-expect-error unit testing
      expect(toBase64(value)).toBe(value);
    });
  });
});
