import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightComponent } from './highlight.component';

describe('ExampleHighlightComponent', () => {
  let component: HighlightComponent;
  let fixture: ComponentFixture<HighlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HighlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
