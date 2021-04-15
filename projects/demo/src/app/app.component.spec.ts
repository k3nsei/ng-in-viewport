/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, expect, it } from '@jest/globals';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async (done) => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    done();
  });

  it('should create component', () => {
    const actual: boolean = component instanceof AppComponent;
    const expected: boolean = true;

    expect(actual).toBe(expected);
  });

  it(`should have title`, () => {
    const actual: string = component.title;
    const expected: string = 'ng-in-viewport demo';

    expect(actual).toBe(expected);
  });

  it('should render title', () => {
    const el: DebugElement = fixture.debugElement.query(By.css('header h1'));
    const actual: string = el.nativeElement.textContent;
    const expected: string = 'ng-in-viewport demo';

    expect(actual).toContain(expected);
  });
});
