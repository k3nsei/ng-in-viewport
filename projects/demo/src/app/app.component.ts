import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ExampleComponent } from './example/example.component';

@Component({
  standalone: true,
  selector: 'invp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExampleComponent],
})
export class AppComponent {
  public readonly title = 'ng-in-viewport demo';
}
