# Use the directive

Let's prepare a simple demo now. Where we will use our directive.

The first step is to prepare a list of elements. Then we add the **`inViewport`** directive to the **`li`** element. After that we configure it by setting **`[inViewportOptions]`**. In this case, we set **`{ threshold: [0] }`** because we want to change **`className`** of the **`li`** element as soon as it is visible. Finally, we assign the **`onIntersection($event)`** method execution to the **`(inViewportAction)`** output.

{% code-tabs %}
{% code-tabs-item title="/src/app/app.component.html" %}
```markup
<ul class="list">
    <li class="list-item inactive"
        inViewport
        [inViewportOptions]="{ threshold: [0] }"
        (inViewportAction)="onIntersection($event)"
        *ngFor="let item of items;">
        <span>{{item}}</span>
    </li>
</ul>
```
{% endcode-tabs-item %}
{% endcode-tabs %}

The second step is to make our demo look nice.

{% code-tabs %}
{% code-tabs-item title="/src/app/app.component.scss" %}
```css
ul.list {
 margin: 0;
 padding: 24px;
 display: block;
 list-style: none;

 > li.list-item {
  width: 100%;
  height: 25vh;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color .25s ease-in-out, color .25s ease-in-out;

  &:not(:first-child) {
   margin-top: 12px;
  }

  &.inactive {
   background-color: #CCCCCC;
   color: rgba(#000000, .85);
  }

  &.active {
   background-color: #00C853;
   color: rgba(#FFFFFF, .85);
  }

  > span {
   font-weight: 700;
  }
 }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

The third and final step is to fill an array of items and to prepare the implementation of our **`onIntersection(): void`** method.

{% code-tabs %}
{% code-tabs-item title="/src/app/app.component.ts" %}
```typescript
import { Component, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public readonly items: number[] = Array(1000).fill(1).map((item, index) => item + index);

    constructor(private renderer: Renderer2) {}
    
    public onIntersection({ target, visible }: { target: Element; visible: boolean }): void {
        this.renderer.addClass(target, visible ? 'active' : 'inactive');
        this.renderer.removeClass(target, visible ? 'inactive' : 'active');
    }
}
```
{% endcode-tabs-item %}
{% endcode-tabs %}

A working example of the above code can be seen on [StackBlitz](https://stackblitz.com/edit/ng-in-viewport-gb-ex-1?embed=1&file=src/app/app.component.scss)

