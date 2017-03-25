# ng-in-viewport
Allows us to check if an element is within the browsers visual viewport

## Installation
`npm install --save ng-in-viewport`

## Usage
``` angular2html
  <div in-viewport (inViewport)="action($event)">
    Lorem ipsum dolor sit amet augue. Sed quam et odio.
  </div>
```

``` typescript
export class ExampleComponent {
  action(event) {
    console.log(event);
  }
}
```

## License
MIT
