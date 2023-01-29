import { stringify } from './stringify';

describe('GIVEN stringify', () => {
  describe('WHEN called with `abcd`', () => {
    it('THEN result should match', () => {
      expect(
        stringify({
          foo: 'bar',
          nested: {
            xyz: 123,
          },
          numbers: [1, 2, 3],
          letters: ['a', 'b', 'c'],
        })
      ).toBe('foo:bar|letters:[a,b,c]|nested:xyz:123|numbers:[1,2,3]');
    });
  });
});
