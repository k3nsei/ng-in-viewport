# ng-in-viewport

<!-- Badges section here. -->
[![CircleCI Status][circle-ci-badge]][circle-ci-badge-url]
[![Dependency Status][david-badge]][david-badge-url]
[![peerDependency Status][david-peer-badge]][david-peer-badge-url]
[![devDependency Status][david-dev-badge]][david-dev-badge-url]

[![npm][npm-badge-version]][npm-badge-url]
[![npm][npm-badge-license]][npm-badge-url]
[![npm][npm-badge-downloads]][npm-badge-url]

Allows us to check if an element is within the browsers visual viewport

## Installation
```sh
npm install --save ng-in-viewport intersection-observer
```
## Demo
[Here](https://embed.plnkr.co/jJe2MTPKQ1avFxKhgBRb/) is example app

## Simple usage example
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
             [inViewportOptions]="{ partial: false }"
             (inViewportAction)="action($event)">
          {{ item }}
        </div>
      </section>
      <section #secondSection>
        <div *ngFor="let item of items" class="item"
             in-viewport
             [inViewportOptions]="{ rootElement: secondSection, partial: false }"
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

## License
[MIT](https://github.com/k3nsei/angular2-in-viewport/blob/master/LICENSE)

[circle-ci-badge]: https://circleci.com/gh/k3nsei/ng-in-viewport/tree/master.svg?style=shield&circle-token=1c961beeff7d2e03a4203efd1858081b9901caac
[circle-ci-badge-url]: https://circleci.com/gh/k3nsei/ng-in-viewport/tree/master

[david-badge]: https://david-dm.org/k3nsei/ng-in-viewport.svg
[david-badge-url]: https://david-dm.org/k3nsei/ng-in-viewport

[david-peer-badge]: https://david-dm.org/k3nsei/ng-in-viewport/peer-status.svg
[david-peer-badge-url]: https://david-dm.org/k3nsei/ng-in-viewport?type=peer

[david-dev-badge]: https://david-dm.org/k3nsei/ng-in-viewport/dev-status.svg
[david-dev-badge-url]: https://david-dm.org/k3nsei/ng-in-viewport?type=dev

[npm-badge-version]: https://img.shields.io/npm/v/ng-in-viewport.svg
[npm-badge-license]: https://img.shields.io/npm/l/ng-in-viewport.svg
[npm-badge-downloads]: https://img.shields.io/npm/dm/ng-in-viewport.svg
[npm-badge-url]: https://www.npmjs.com/package/ng-in-viewport