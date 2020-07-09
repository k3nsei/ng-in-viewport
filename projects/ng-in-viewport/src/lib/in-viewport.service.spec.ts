/*******************************************************************************
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 * (https://www.linkedin.com/in/piotrstepniewski/)
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://opensource.org/licenses/MIT
 */

import { inject, TestBed } from '@angular/core/testing';
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
