import { InvalidRootMarginException } from '../exceptions';

import { RootMargin } from './root-margin';

describe('GIVEN RootMargin', () => {
  describe('WHEN created with valid value', () => {
    it('THEN input `10px` should result to `10px 10px 10px 10xp`', () => {
      expect(new RootMargin('10px').value).toBe('10px 10px 10px 10px');
    });

    it('THEN input `10px 20px` should result to `10px 20px 10px 20xp`', () => {
      expect(new RootMargin('10px 20px').value).toBe('10px 20px 10px 20px');
    });

    it('THEN input `10px 20% 30px` should result to `10px 20% 30px 20%`', () => {
      expect(new RootMargin('10px 20% 30px').value).toBe('10px 20% 30px 20%');
    });

    it('THEN input `10px 20% 30px 40%` should result to `10px 20% 30px 40%`', () => {
      expect(new RootMargin('10px 20% 30px 40%').value).toBe('10px 20% 30px 40%');
    });
  });

  describe('WHEN created with nullable value', () => {
    it('THEN value should return default value', () => {
      [null, undefined].forEach((val) => {
        expect(new RootMargin(val).value).toBe('0px 0px 0px 0px');
      });
    });
  });

  describe('WHEN created with invalid value', () => {
    it('THEN exception should be thrown', () => {
      ['1px, 2px, 3px, 4px', '1rem 2rem 3rem 4rem'].forEach((val) => {
        expect(() => new RootMargin(val)).toThrow(InvalidRootMarginException);
      });
    });
  });
});
