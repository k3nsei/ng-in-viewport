/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from '@jest/globals';
import { Subject } from 'rxjs';
import { InViewportService } from './in-viewport.service';
import { intersectionObserverFactory } from './mocks';

const trigger$: Subject<[Element, Partial<Omit<IntersectionObserverEntry, 'target'>>]> = new Subject();

describe('InViewportService', () => {
  let service: InViewportService;
  let destroyIntersectionObserver: () => void;

  beforeEach(async (done) => {
    destroyIntersectionObserver = intersectionObserverFactory(trigger$);

    await TestBed.configureTestingModule({
      providers: [InViewportService]
    }).compileComponents();

    service = TestBed.inject(InViewportService);

    done();
  });

  afterEach(() => destroyIntersectionObserver());

  it('should create service', () => {
    const actual: boolean = service instanceof InViewportService;
    const expected: boolean = true;

    expect(actual).toBe(expected);
  });
});
