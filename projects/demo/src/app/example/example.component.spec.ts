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
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  const activeClassName: string = 'item--active';
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async (done) => {
    await TestBed.configureTestingModule({
      declarations: [ExampleComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    done();
  });

  it('should create', () => {
    const actual: boolean = component instanceof ExampleComponent;
    const expected: boolean = true;

    expect(actual).toBe(expected);
  });

  it(`should have correct elements count`, () => {
    const actual: number = component.elements.length;
    const expected: number = 100;

    expect(actual).toBe(expected);
  });

  describe('first section', () => {
    it('should rendered correct elements count', () => {
      const actual: number = fixture.debugElement.queryAll(By.css('.example.example--first .item')).length;
      const expected: number = 100;

      expect(actual).toBe(expected);
    });

    it('should be inactive item', () => {
      const el: DebugElement = fixture.debugElement.query(By.css('.example.example--first .item'));

      component.handleAction({ target: el.nativeElement, visible: false });
      fixture.detectChanges();

      const actual: boolean = !!el.classes[activeClassName];
      const expected: boolean = false;

      expect(actual).toBe(expected);
    });

    it('should be active item', () => {
      const el: DebugElement = fixture.debugElement.query(By.css('.example.example--first .item'));

      component.handleAction({ target: el.nativeElement, visible: true });
      fixture.detectChanges();

      const actual: boolean = el.classes[activeClassName];
      const expected: boolean = true;

      expect(actual).toBe(expected);
    });
  });

  describe('first section', () => {
    it('should rendered correct elements count', () => {
      const actual: number = fixture.debugElement.queryAll(By.css('.example.example--second .item')).length;
      const expected: number = 100;

      expect(actual).toBe(expected);
    });

    it('should be inactive item', () => {
      const el: DebugElement = fixture.debugElement.query(By.css('.example.example--second .item'));

      component.handleAction({ target: el.nativeElement, visible: false });
      fixture.detectChanges();

      const actual: boolean = !!el.classes[activeClassName];
      const expected: boolean = false;

      expect(actual).toBe(expected);
    });

    it('should be active item', () => {
      const el: DebugElement = fixture.debugElement.query(By.css('.example.example--second .item'));

      component.handleAction({ target: el.nativeElement, visible: true });
      fixture.detectChanges();

      const actual: boolean = el.classes[activeClassName];
      const expected: boolean = true;

      expect(actual).toBe(expected);
    });
  });
});
