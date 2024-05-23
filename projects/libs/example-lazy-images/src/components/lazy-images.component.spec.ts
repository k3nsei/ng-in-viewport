import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyImagesComponent } from './lazy-images.component';

describe('ExampleLazyImagesComponent', () => {
  let component: LazyImagesComponent;
  let fixture: ComponentFixture<LazyImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LazyImagesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LazyImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
