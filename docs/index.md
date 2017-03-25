# Installation
```sh
npm install --save ng-in-viewport
```

# Demo
[Here](https://embed.plnkr.co/SE5DdvrNzAKNWIyTCzDY/) is example app

# Simple usage example
```typescript
import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'in-vp-example',
  template: `
    <div class="item inactive"
         *ngFor="let item of items"
         in-viewport
         [inViewportOptions]="{ partial: false }"
         (inViewport)="onInViewportChange($event)">
      {{ item }}
    </div>
  `,
  styles: [
      `
      .item {
        width: 100px;
        height: 100px;
        margin: 0 auto 10px;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: #fff;
      }

      .item.active {
        background-color: #1ab300;
      }

      .item.inactive {
        background-color: gray;
      }
    `
  ]
})
export class InVpExampleComponent {
  public items: Array<number>;

  constructor(private renderer: Renderer2) {
    this.items = Array(100)
      .fill(0)
      .map((item, i) => (i + 1));
  }

  onInViewportChange(event: any) {
    if(event.value) {
      this.renderer.setProperty(event.target, 'className', 'item active');
    } else {
      this.renderer.setProperty(event.target, 'className', 'item inactive');
    }
  }
}
```

# License
[MIT](https://github.com/k3nsei/angular2-in-viewport/blob/master/LICENSE)
