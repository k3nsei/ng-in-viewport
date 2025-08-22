import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { uniqueId } from 'lodash';
import { Subscription } from 'rxjs';

import { Config } from '../values';

import { InViewportService } from './in-viewport.service';

const createNode = (): HTMLDivElement => {
  return Object.assign(document.createElement('div'), {
    className: uniqueId('c-'),
  });
};

describe('GIVEN InViewportService', () => {
  let spectator: SpectatorService<InViewportService>;
  let service: InViewportService;

  const createService = createServiceFactory(InViewportService);

  beforeEach(() => {
    spectator = createService();
    service = spectator.service;
  });

  describe('WHEN service was created', () => {
    it('THEN instance should exists', () => {
      expect(service).toBeTruthy();
    });

    it('THEN trigger$ should be observable', () => {
      expect(service.trigger$).toBeDefined();
      expect(typeof service.trigger$.subscribe).toBe('function');
    });

    describe('AND `register` method was called', () => {
      const node = createNode();
      const config = new Config();

      let triggerSubscription$: Subscription;
      let receivedEvents: IntersectionObserverEntry[] = [];

      beforeEach(() => {
        triggerSubscription$ = service.trigger$.subscribe((entry) => {
          receivedEvents.push(entry);
        });

        service.register(node, config);
      });

      afterEach(() => {
        triggerSubscription$.unsubscribe();
        receivedEvents = [];
      });

      it('THEN register method should execute without errors', () => {
        expect(() => service.register(node, config)).not.toThrow();
      });
    });

    describe('AND `unregister` method was called', () => {
      const node = createNode();
      const config = new Config();

      beforeEach(() => {
        // Register first to have something to unregister
        service.register(node, config);
        service.unregister(node, config);
      });

      it('THEN unregister method should execute without errors', () => {
        expect(() => service.unregister(node, config)).not.toThrow();
      });
    });
  });
});
