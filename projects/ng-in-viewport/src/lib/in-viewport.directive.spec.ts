/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  QueryList,
  Renderer2,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { InViewportDirective } from './in-viewport.directive';
import { intersectionObserverFactory } from './mocks';

jest.useFakeTimers();

const trigger$: Subject<[Element, Partial<Omit<IntersectionObserverEntry, 'target'>>]> = new Subject();
const delay = Math.floor(1000 / 60);

@Component({
  template: `
    <div class="list" #listElement>
      <div
        class="item inactive"
        inViewport
        [inViewportOptions]="{ partial: true, root: listElement }"
        (inViewportAction)="handleAction($event)"
      ></div>
      <div
        class="item inactive"
        inViewport
        [inViewportOptions]="{ partial: true, root: listElement }"
        (inViewportAction)="handleAction($event)"
      ></div>
      <div
        class="item inactive"
        inViewport
        [inViewportOptions]="{ partial: true, root: listElement }"
        (inViewportAction)="handleAction($event)"
      ></div>
    </div>
  `,
  styles: [
    `
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      :root,
      body {
        margin: 0;
        padding: 0;
      }

      .list {
        width: 5px;
        height: 5px;
        margin: 0;
        padding: 0;
        overflow: hidden;
      }

      .item {
        width: 10px;
        height: 10px;
      }

      .item.inactive {
        background-color: red;
      }

      .item.active {
        background-color: lime;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
class TestInViewportComponent {
  @ViewChildren(InViewportDirective) invps!: QueryList<InViewportDirective>;

  constructor(private renderer: Renderer2) {}

  handleAction({ target = null, visible = false }): void {
    const addClass = visible ? 'active' : 'inactive';
    this.renderer.addClass(target, addClass);

    const rmClass = visible ? 'inactive' : 'active';
    this.renderer.removeClass(target, rmClass);
  }
}

describe('InViewportDirective', () => {
  let fixture: ComponentFixture<TestInViewportComponent>;
  let component: TestInViewportComponent;
  let destroyIntersectionObserver: () => void;

  beforeEach(async (done) => {
    destroyIntersectionObserver = intersectionObserverFactory(trigger$);

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestInViewportComponent, InViewportDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestInViewportComponent);
    component = fixture.componentInstance;

    done();
  });

  afterEach(() => destroyIntersectionObserver());

  it('should create component', () => {
    expect(component instanceof TestInViewportComponent).toBe(true);
  });

  it('should have items', () => {
    fixture.detectChanges();

    expect(component.invps.toArray().length).toBe(3);
  });

  it('should render items', () => {
    fixture.detectChanges();

    const items: DebugElement[] = fixture.debugElement.queryAll(By.css('.list .item'));

    expect(items.length).toBe(3);
  });

  it('should emit inViewportAction', (done) => {
    fixture.detectChanges();

    const item: DebugElement = fixture.debugElement.query(By.css('.list .item'));

    jest.spyOn(component, 'handleAction');

    trigger$.next([
      item.nativeElement,
      {
        isIntersecting: true,
        intersectionRatio: 1
      }
    ]);

    setTimeout(() => {
      expect(component.handleAction).toHaveBeenCalled();
      done();
    }, delay);

    jest.advanceTimersByTime(delay);
  });
});
