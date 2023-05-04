import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { EMPTY } from 'rxjs';

import { InViewportAction, InViewportService } from 'ng-in-viewport';

import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  const activeClassName = 'item--active';
  const createComponent = createComponentFactory({
    component: ExampleComponent,
    providers: [MockProvider(InViewportService, { trigger$: EMPTY })],
  });
  let spectator: Spectator<ExampleComponent>;
  let component: ExampleComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create component', () => {
    const actual: boolean = component instanceof ExampleComponent;
    const expected = true;

    expect(actual).toBe(expected);
    expect(spectator.debugElement.nativeElement).toMatchSnapshot();
  });

  it(`should have correct items count`, () => {
    const actual: number = component.items.length;
    const expected = 100;

    expect(actual).toBe(expected);
  });

  describe('first section', () => {
    it('should rendered correct elements count', () => {
      const actual: number = spectator.queryAll('.example.example--first .item').length;
      const expected = 100;

      expect(actual).toBe(expected);
    });

    it('should be inactive item', () => {
      const el = spectator.query('.example.example--first .item');

      component.handleAction({ target: el, visible: false } as InViewportAction);
      spectator.detectChanges();

      expect(el).not.toHaveClass(activeClassName);
    });

    it('should be active item', () => {
      const el = spectator.query('.example.example--first .item');

      component.handleAction({ target: el, visible: true } as InViewportAction);
      spectator.detectChanges();

      expect(el).toHaveClass(activeClassName);
    });
  });

  describe('second section', () => {
    it('should rendered correct elements count', () => {
      const actual: number = spectator.queryAll('.example.example--second .item').length;
      const expected = 100;

      expect(actual).toBe(expected);
    });

    it('should be inactive item', () => {
      const el = spectator.query('.example.example--second .item');

      component.handleAction({ target: el, visible: false } as InViewportAction);
      spectator.detectChanges();

      expect(el).not.toHaveClass(activeClassName);
    });

    it('should be active item', () => {
      const el = spectator.query('.example.example--second .item');

      component.handleAction({ target: el, visible: true } as InViewportAction);
      spectator.detectChanges();

      expect(el).toHaveClass(activeClassName);
    });
  });
});
