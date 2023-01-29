import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    const actual: boolean = component instanceof AppComponent;
    const expected = true;

    expect(actual).toBe(expected);
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  it(`should have title`, () => {
    const actual: string = component.title;
    const expected = 'ng-in-viewport demo';

    expect(actual).toBe(expected);
  });

  it('should render title', () => {
    const el: DebugElement = fixture.debugElement.query(By.css('header h1'));
    const actual: string = el.nativeElement.textContent;
    const expected = 'ng-in-viewport demo';

    expect(actual).toContain(expected);
  });
});
