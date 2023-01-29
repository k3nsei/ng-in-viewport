import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { MockDirective } from 'ng-mocks';

import { InViewportAction, InViewportDirective } from 'ng-in-viewport';

import { PageHighlightingComponent } from './page-highlighting.component';

describe('GIVEN PageHighlightingComponent', () => {
  let spectator: Spectator<PageHighlightingComponent>;
  let component: PageHighlightingComponent;
  const createComponent = createComponentFactory({
    component: PageHighlightingComponent,
    overrideComponents: [
      [
        PageHighlightingComponent,
        {
          remove: { imports: [InViewportDirective] },
          add: { imports: [MockDirective(InViewportDirective)] },
        },
      ],
    ],
  });

  describe('WHEN component was created', () => {
    beforeEach(() => {
      spectator = createComponent();
      component = spectator.component;
    });

    it('THEN instance should exists', () => {
      expect(component).toBeTruthy();
    });

    it('THEN host should match snapshot', () => {
      const hostElement = spectator.element;

      expect(hostElement).toMatchSnapshot();
    });

    it('THEN host should render 100 inactive tiles', () => {
      const tiles = spectator.queryAll('.grid-tile.inactive');

      expect(tiles.length).toBe(100);
    });

    describe('AND `highlight` method was called', () => {
      beforeEach(() => {
        const tile = spectator.query('.grid-tile.inactive');

        component.highlight({ target: tile, visible: true } as InViewportAction);
      });

      it('THEN one tile should be active', () => {
        const tile = spectator.query('.grid-tile.active');

        expect(tile).toBeTruthy();
      });
    });
  });
});
