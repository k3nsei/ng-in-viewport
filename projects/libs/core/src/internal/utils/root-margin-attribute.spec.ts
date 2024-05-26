import { rootMarginAttribute } from './root-margin-attribute';

describe(`GIVEN ${rootMarginAttribute.name}`, () => {
  describe(`WHEN valid provided valid pixel input`, () => {
    it('THEN (top, right, bottom, left) should be parsed', () => {
      expect(rootMarginAttribute('1px 2px 3px 4px')).toBe('1px 2px 3px 4px');
    });

    it('THEN (top, right, bottom) should be parsed', () => {
      expect(rootMarginAttribute('1px 2px 3px')).toBe('1px 2px 3px 2px');
    });

    it('THEN (top, right) should be parsed', () => {
      expect(rootMarginAttribute('1px 2px')).toBe('1px 2px 1px 2px');
    });

    it('THEN (top) should be parsed', () => {
      expect(rootMarginAttribute('1px')).toBe('1px 1px 1px 1px');
    });
  });

  describe(`WHEN valid provided valid percent input`, () => {
    it('THEN (top, right, bottom, left) should be parsed', () => {
      expect(rootMarginAttribute('10% 20% 30% 40%')).toBe('10% 20% 30% 40%');
    });

    it('THEN (top, right, bottom) should be parsed', () => {
      expect(rootMarginAttribute('10% 20% 30%')).toBe('10% 20% 30% 20%');
    });

    it('THEN (top, right) should be parsed', () => {
      expect(rootMarginAttribute('10% 20%')).toBe('10% 20% 10% 20%');
    });

    it('THEN (top) should be parsed', () => {
      expect(rootMarginAttribute('10%')).toBe('10% 10% 10% 10%');
    });
  });
});
