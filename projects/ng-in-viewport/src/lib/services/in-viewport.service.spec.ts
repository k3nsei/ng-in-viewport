import { SpectatorService, createServiceFactory } from '@ngneat/spectator/jest';
import { uniqueId } from 'lodash';

import { Config } from '../values';

import { InViewportService } from './in-viewport.service';

const createNode = (): HTMLDivElement => {
  return Object.assign(document.createElement('div'), {
    className: uniqueId('c-'),
  });
};

const mockAddNode = jest.fn();
const mockDeleteNode = jest.fn();

jest.mock('../utils/observer-cache', () => ({
  ObserverCache: jest.fn().mockImplementation(() => ({
    addNode: mockAddNode,
    deleteNode: mockDeleteNode,
  })),
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

      beforeEach(() => {
        service.register(node, config);
      });

      it('THEN `addNode` from cache should by called by service', () => {
        expect(mockAddNode).toHaveBeenCalledWith(node, config);
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
