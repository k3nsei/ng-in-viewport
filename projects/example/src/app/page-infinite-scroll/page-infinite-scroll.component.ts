import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Self } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { of } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { DestroyableDirective, InViewportAction, InViewportDirective } from 'ng-in-viewport';

@Component({
  standalone: true,
  selector: 'invp-ex-page-infinite-scroll',
  hostDirectives: [DestroyableDirective],
  templateUrl: './page-infinite-scroll.component.html',
  styleUrls: ['./page-infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    NgClass,
    NgForOf,
    NgIf,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    InViewportDirective,
    DestroyableDirective,
  ],
})
export class PageInfiniteScrollComponent {
  public cards = PageInfiniteScrollComponent.generateCards();

  public loading = false;

  public page = 1;

  public pages = 20;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Self() private readonly destroyable: DestroyableDirective
  ) {}

  private static generateCards(): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  public loadMore(event: InViewportAction | MouseEvent): void {
    if (this.page >= this.pages || ('visible' in event && !event.visible)) {
      return;
    }

    this.loading = true;
    this.changeDetectorRef.detectChanges();

    of([...this.cards, ...PageInfiniteScrollComponent.generateCards()])
      .pipe(delay(1000), takeUntil(this.destroyable.destroyed$))
      .subscribe((cards) => {
        this.page += 1;
        this.loading = false;
        this.cards = cards;
        this.changeDetectorRef.detectChanges();
      });
  }
}

export default PageInfiniteScrollComponent;
