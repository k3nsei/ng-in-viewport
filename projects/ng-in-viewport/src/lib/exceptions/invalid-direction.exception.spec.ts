import { InViewportDirection } from '../enums';

import { InvalidDirectionException } from './invalid-direction.exception';

describe('GIVEN InvalidDirectionException', () => {
  describe('WHEN exception was thrown', () => {
    const throwException = () => {
      throw new InvalidDirectionException();
    };

    it('THEN error should be instance of TypeError', () => {
      expect(throwException).toThrow(TypeError);
    });

    it('THEN error message should match', () => {
      const values = Object.values(InViewportDirection).join('|');
      const message = [
        'The provided value for the direction is incorrect.',
        `The value must be any of \`${values}\`.`,
      ].join(' ');

      expect(throwException).toThrow(message);
    });
  });
});
