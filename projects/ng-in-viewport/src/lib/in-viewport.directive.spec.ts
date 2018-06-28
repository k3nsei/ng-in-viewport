import { CommonModule } from '@angular/common';
import { Component, DebugElement, QueryList, Renderer2, ViewChildren, ViewEncapsulation } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { InViewportDirective } from './in-viewport.directive';

@Component({
  template: `
    <div class="list" #listElement>
      <div class="item inactive" inViewport [inViewportOptions]="{ partial: true, root: listElement }" (inViewportAction)="handleAction($event)"></div>
      <div class="item inactive" inViewport [inViewportOptions]="{ partial: true, root: listElement }" (inViewportAction)="handleAction($event)"></div>
      <div class="item inactive" inViewport [inViewportOptions]="{ partial: true, root: listElement }" (inViewportAction)="handleAction($event)"></div>
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
  encapsulation: ViewEncapsulation.None
})
class TestInViewportComponent {
  @ViewChildren(InViewportDirective) invps: QueryList<InViewportDirective>;

  constructor(private renderer: Renderer2) {}

  handleAction({ target = null, visible = false }) {
    const addClass = visible ? 'active' : 'inactive';
    this.renderer.addClass(target, addClass);

    const rmClass = visible ? 'inactive' : 'active';
    this.renderer.removeClass(target, rmClass);
  }
}

describe('InViewportDirective', () => {
  const delay = Math.floor(1000 / 60);
  let component: TestInViewportComponent;
  let fixture: ComponentFixture<TestInViewportComponent>;
  let list: DebugElement;
  let items: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [TestInViewportComponent, InViewportDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestInViewportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    list = fixture.debugElement.query(By.css('.list'));
    items = fixture.debugElement.queryAll(By.css('.item'));
    list.nativeElement.scrollTo(0, 0);
  });

  it('should render', () => {
    expect(component.invps.toArray().length).toBeGreaterThan(0);
  });

  it('should emit inViewportAction', (done) => {
    spyOn(component, 'handleAction');

    setTimeout(() => {
      expect(component.handleAction).toHaveBeenCalled();
      done();
    }, delay);
  });
});
