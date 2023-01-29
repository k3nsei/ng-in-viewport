import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'invp-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public readonly title = 'ng-in-viewport demo';
}
