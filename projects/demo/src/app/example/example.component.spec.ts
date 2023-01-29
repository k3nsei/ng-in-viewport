import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InViewportAction } from 'ng-in-viewport';

import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  const activeClassName = 'item--active';
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    const actual: boolean = component instanceof ExampleComponent;
    const expected = true;

    expect(actual).toBe(expected);
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it(`should have correct elements count`, () => {
    const actual: number = component.elements.length;
    const expected = 100;

    expect(actual).toBe(expected);
  });

  describe('first section', () => {
    it('should rendered correct elements count', () => {
      const actual: number = fixture.debugElement.queryAll(By.css('.example.example--first .item')).length;
      const expected = 100;

      expect(actual).toBe(expected);
    });

    it('should be inactive item', () => {
      const el: DebugElement = fixture.debugElement.query(By.css('.example.example--first .item'));

      component.handleAction({ target: el.nativeElement, visible: false } as InViewportAction);
      fixture.detectChanges();

      const actual = !!el.classes[activeClassName];
      const expected = false;

      expect(actual).toBe(expected);
    });

    it('should be active item', () => {
      const el: DebugElement = fixture.debugElement.query(By.css('.example.example--first .item'));

      component.handleAction({ target: el.nativeElement, visible: true } as InViewportAction);
      fixture.detectChanges();

      const actual: boolean = el.classes[activeClassName];
      const expected = true;

      expect(actual).toBe(expected);
    });
  });

  describe('second section', () => {
    it('should rendered correct elements count', () => {
      const actual: number = fixture.debugElement.queryAll(By.css('.example.example--second .item')).length;
      const expected = 100;

      expect(actual).toBe(expected);
    });

    it('should be inactive item', () => {
      const el: DebugElement = fixture.debugElement.query(By.css('.example.example--second .item'));

      component.handleAction({ target: el.nativeElement, visible: false } as InViewportAction);
      fixture.detectChanges();

      const actual = !!el.classes[activeClassName];
      const expected = false;

      expect(actual).toBe(expected);
    });

    it('should be active item', () => {
      const el: DebugElement = fixture.debugElement.query(By.css('.example.example--second .item'));

      component.handleAction({ target: el.nativeElement, visible: true } as InViewportAction);
      fixture.detectChanges();

      const actual: boolean = el.classes[activeClassName];
      const expected = true;

      expect(actual).toBe(expected);
    });
  });
});
