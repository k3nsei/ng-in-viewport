import { TestBed, inject } from '@angular/core/testing';
import { InViewportService } from './in-viewport.service';

describe('InViewportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InViewportService]
    });
  });

  it('should be created', inject([InViewportService], (service: InViewportService) => {
    expect(service).toBeTruthy();
  }));
});
