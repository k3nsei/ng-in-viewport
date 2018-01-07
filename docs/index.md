# Installation
```sh
npm install --save ng-in-viewport intersection-observer
```
# Demo
[Here](https://embed.plnkr.co/jJe2MTPKQ1avFxKhgBRb/) is example app

# Simple usage example
```typescript
import { NgModule, Component, ViewEncapsulation, Renderer2 } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InViewportModule } from 'ng-in-viewport';

// Remember to import `intersection-observer` polyfill to support all major browsers
import 'intersection-observer';

@NgModule({
  declarations: [
    InVpExampleComponent
  ],
  imports: [
    BrowserModule,
    InViewportModule.forRoot()
  ],
  providers: [],
  bootstrap: [InVpExampleComponent]
})
export class InVpExampleModule {}

@Component({
  selector: 'in-vp-example',
  encapsulation: ViewEncapsulation.None,
  template: `
    <main>
      <section>
        <div *ngFor="let item of items" class="item"
             in-viewport
             [inViewportOptions]="{ partial: false, debounce: 0}"
             (inViewportAction)="action($event)">
          {{ item }}
        </div>
      </section>
      <section #secondSection>
        <div *ngFor="let item of items" class="item"
             in-viewport
             [inViewportOptions]="{ rootElement: secondSection, partial: false, debounce: 0 }"
             (inViewportAction)="action($event)">
          {{ item }}
        </div>
      </section>
    </main>
  `,
  styles: [`
    *, *::before, *::after {
      box-sizing: border-box;
    }
    
    html, body {
      margin: 0;
      padding: 0;
    }
    
    main {
      width: 100%;
      min-height: 100vh;
      margin: 0 auto;
      padding: 10px;
      display: flex;
      flex-flow: row nowrap;
      background-color: #f4f4f4;
    }
    
    section {
      margin: 0;
      padding: 10px;
      display: block;
      flex: 1 0 auto;
      border: 1px solid #bdbdbd;
    }
    
    section:not(:first-of-type) {
      margin-left: 10px;
    }
    
    section:nth-of-type(2) {
      height: 80vh;
      overflow: auto;
    }
    
    .item {
      width: 100%;
      height: 10vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #cccccc;
      font-size: 2em;
      font-weight: bold;
      color: #ffffff;
      transition: background-color 250ms linear;
    }
    
    .item:not(:first-child) {
      margin-top: 10px;
    }
    
    .item.active {
      background-color: #00a42f;
    }
  `]
})
export class InVpExampleComponent {
  items: number[];

  constructor(private renderer: Renderer2) {
    this.items = Array(100).fill(void 0).map((v, i) => (i + 1));
  }

  action(event) {
    if (event.value) {
      this.renderer.addClass(event.target, 'active');
      this.renderer.removeClass(event.target, 'inactive');
    } else {
      this.renderer.addClass(event.target, 'inactive');
      this.renderer.removeClass(event.target, 'active');
    }
  }
}
```
## Options
debounce - ms dealy for in-view check



# License
[MIT](https://github.com/k3nsei/angular2-in-viewport/blob/master/LICENSE)
