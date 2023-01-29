import { PLATFORM_ID } from '@angular/core';
import { HostComponent } from '@ngneat/spectator';
import { SpectatorDirective, createDirectiveFactory } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { ReplaySubject } from 'rxjs';

import { InViewportDirection } from '../enums';
import { InViewportService } from '../services';
import { Config } from '../values';

import { InViewportDirective, InViewportMetadata } from './in-viewport.directive';

describe('GIVEN InViewportDirective', () => {
  const createDirective = createDirectiveFactory(InViewportDirective);
  let spectator: SpectatorDirective<InViewportDirective>;
  let directive: InViewportDirective;
  let host: HostComponent & { action: () => void };
  let service: InViewportService;
  let node: Element;
  let config: Config;
  let trigger$: ReplaySubject<IntersectionObserverEntry>;

  describe('WHEN directive was created', () => {
    beforeEach(async () => {
      trigger$ = new ReplaySubject(1);

      spectator = createDirective(
        `<div inViewport [inViewportOptions]='options' (inViewportAction)='action($event)'>Testing InViewportDirective</div>`,
        {
          hostProps: { options: { threshold: [0, 0.5, 1], partial: false }, action: jest.fn() },
          providers: [
            MockProvider(InViewportService, {
              trigger$: trigger$.asObservable(),
              register: jest.fn(),
              unregister: jest.fn(),
            }),
          ],
        }
      );

      directive = spectator.directive;
      host = spectator.hostComponent as HostComponent & { action: () => void };
      service = spectator.inject(InViewportService);
      node = spectator.query('div') as HTMLDivElement;
      config = new Config({ threshold: [0, 0.5, 1] });
    });

    it('THEN instance should exists', () => {
      expect(directive).toBeTruthy();
    });

    it('THEN `register` methods from service should be called', () => {
      expect(service.register).toHaveBeenCalledWith(node, config);
    });

    describe('AND `trigger$` observable from service emitted partially visible value', () => {
      beforeEach(() =>
        trigger$.next({
          target: node,
          intersectionRatio: 0.5,
          isIntersecting: true,
        } as IntersectionObserverEntry)
      );

      it('THEN `action` method from host component should be called by action output', () => {
        expect(host.action).toHaveBeenCalledTimes(1);
      });
    });

    describe('AND `trigger$` observable from service emitted visible value', () => {
      beforeEach(() =>
        trigger$.next({
          target: node,
          intersectionRatio: 1,
          isIntersecting: true,
        } as IntersectionObserverEntry)
      );

      it('THEN `action` method from host component should be called by action output', () => {
        expect(host.action).toHaveBeenCalledTimes(1);
      });
    });

    describe('AND config has checkFn and `trigger$` observable from service emitted value', () => {
      let mockCheckFn: () => void;

      beforeEach(() => {
        mockCheckFn = jest.fn();

        spectator.setInput('options', { partial: true, checkFn: mockCheckFn });
        spectator.detectChanges();

        trigger$.next({
          target: node,
          intersectionRatio: 1,
          isIntersecting: false,
        } as IntersectionObserverEntry);
      });

      it('THEN `action` method from host component should be called by action output', () => {
        expect(host.action).toHaveBeenCalledTimes(1);
      });

      it('THEN provided `checkFn` function should be called', () => {
        expect(mockCheckFn).toHaveBeenCalledTimes(1);
      });
    });

    describe('AND directive was destroyed', () => {
      beforeEach(() => spectator.fixture.destroy());

      it('THEN `unregister` methods from service should be called', () => {
        expect(service.unregister).toHaveBeenCalledWith(node, config);
      });
    });
  });

  describe('WHEN directive was created on server platform', () => {
    beforeEach(async () => {
      trigger$ = new ReplaySubject(1);

      spectator = createDirective(
        `<div inViewport [inViewportOptions]='options' (inViewportAction)='action($event)'>Testing InViewportDirective</div>`,
        {
          hostProps: { options: { threshold: [0, 0.5, 1] }, action: jest.fn() },
          providers: [
            { provide: PLATFORM_ID, useValue: 'server' },
            MockProvider(InViewportService, {
              trigger$: trigger$.asObservable(),
              register: jest.fn(),
              unregister: jest.fn(),
            }),
          ],
        }
      );

      directive = spectator.directive;
      host = spectator.hostComponent as HostComponent & { action: () => void };
      service = spectator.inject(InViewportService);
      node = spectator.query('div') as HTMLDivElement;
      config = new Config({
        root: spectator.element,
        rootMargin: '1px 2px 3px 4px',
        threshold: 1,
        partial: false,
        direction: InViewportDirection.VERTICAL,
      });
    });

    it('THEN instance should exists', () => {
      expect(directive).toBeTruthy();
    });

    it('THEN `register` methods from service should be called', () => {
      expect(service.register).not.toHaveBeenCalled();
    });

    it('THEN `action` method from host component should be called by action output', () => {
      expect(host.action).toHaveBeenCalledWith({
        [InViewportMetadata]: { entry: undefined },
        target: node,
        visible: true,
      });
    });

    describe('AND directive was destroyed', () => {
      beforeEach(() => spectator.fixture.destroy());

      it('THEN `unregister` methods from service should be called', () => {
        expect(service.unregister).not.toHaveBeenCalled();
      });
    });
  });
});
