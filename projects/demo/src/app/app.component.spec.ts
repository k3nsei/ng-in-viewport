import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { MockProvider } from 'ng-mocks';
import { EMPTY } from 'rxjs';

import { InViewportService } from 'ng-in-viewport';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  const createComponent = createComponentFactory({
    component: AppComponent,
    providers: [MockProvider(InViewportService, { trigger$: EMPTY })],
  });
  let spectator: Spectator<AppComponent>;
  let component: AppComponent;

  beforeEach(() => {
    spectator = createComponent();
    component = spectator.component;
  });

  it('should create component', () => {
    const actual: boolean = component instanceof AppComponent;
    const expected = true;

    expect(actual).toBe(expected);
    expect(spectator.debugElement.nativeElement).toMatchSnapshot();
  });

  it(`should have title`, () => {
    const actual: string = component.title;
    const expected = 'ng-in-viewport demo';

    expect(actual).toBe(expected);
  });

  it('should render title', () => {
    const actual = spectator.query('header h1');
    const expected = 'ng-in-viewport demo';

    expect(actual).toHaveText(expected);
  });
});
