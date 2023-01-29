import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'invp-ex-lazy-image-skeleton',
  templateUrl: './lazy-image-skeleton.component.html',
  styleUrls: ['./lazy-image-skeleton.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LazyImageSkeletonComponent {}
