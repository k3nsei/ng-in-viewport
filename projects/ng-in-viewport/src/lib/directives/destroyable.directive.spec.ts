import { SpectatorDirective, createDirectiveFactory } from '@ngneat/spectator/jest';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DestroyableDirective } from './destroyable.directive';

describe('GIVEN DestroyableDirective', () => {
  const createDirective = createDirectiveFactory(DestroyableDirective);
  let spectator: SpectatorDirective<DestroyableDirective>;
  let directive: DestroyableDirective;

  beforeEach(async () => {
    spectator = createDirective(`<div inViewportDestroyable>Testing DestroyableDirective</div>`);
    directive = spectator.directive;
  });

  describe('WHEN directive was created', () => {
    let complete: () => void;

    beforeEach(() => {
      complete = jest.fn();
      interval(1).pipe(takeUntil(directive.destroyed$)).subscribe({ complete });
    });

    it('THEN instance should exists', () => {
      expect(directive).toBeTruthy();
    });

    it("THEN `complete` function wasn't called", () => {
      expect(complete).not.toHaveBeenCalled();
    });

    describe('AND directive was destroyed', () => {
      beforeEach(() => {
        spectator.fixture.destroy();
      });

      it('THEN `complete` function was called', () => {
        expect(complete).toHaveBeenCalledTimes(1);
      });
    });
  });
});
