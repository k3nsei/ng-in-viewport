import { NgZone } from '@angular/core';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { uniqueId } from 'lodash';
import { Subscription } from 'rxjs';

import { ObserverCache } from '../utils';
import { Config } from '../values';

import { InViewportService } from './in-viewport.service';

const createNode = (): HTMLDivElement => {
  return Object.assign(document.createElement('div'), {
    className: uniqueId('c-'),
  });
};

let mockAddNode: (node: Element, config: Config) => void;
let mockDeleteNode: (node: Element, config: Config) => void;

jest.mock('../utils/observer-cache', () => ({
  ObserverCache: jest.fn().mockImplementation((...args: ConstructorParameters<typeof ObserverCache>) => {
    const callback = args[0];

    mockAddNode = jest.fn().mockImplementation((node) => {
      callback([{ target: node } as IntersectionObserverEntry], {} as IntersectionObserver);
    });
    mockDeleteNode = jest.fn();

    return {
      addNode: mockAddNode,
      deleteNode: mockDeleteNode,
    };
  }),
}));

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

    describe('AND `register` method was called', () => {
      const node = createNode();
      const config = new Config();

      let triggerCallback: (...args: any[]) => boolean;
      let triggerSubscription$: Subscription;

      beforeEach(() => {
        triggerCallback = jest.fn().mockImplementation(() => NgZone.isInAngularZone());

        triggerSubscription$ = service.trigger$.subscribe((...args) => triggerCallback(...args));

        service.register(node, config);
      });

      afterEach(() => triggerSubscription$.unsubscribe());

      it('THEN `addNode` from cache should by called by service', () => {
        expect(mockAddNode).toHaveBeenCalledWith(node, config);
      });

      it('THEN intersection event should be handled in NgZone', () => {
        expect(triggerCallback).toHaveReturnedWith(true);
      });

      it('THEN `trigger$` should emit initial event', () => {
        expect(triggerCallback).toHaveBeenCalledWith({ target: node });
      });
    });

    describe('AND `unregister` method was called', () => {
      const node = createNode();
      const config = new Config();

      beforeEach(() => {
        service.unregister(node, config);
      });

      it('THEN `deleteNode` from cache should by called by service', () => {
        expect(mockDeleteNode).toHaveBeenCalledWith(node, config);
      });
    });
  });
});
