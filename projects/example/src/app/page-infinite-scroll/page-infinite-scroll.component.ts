import { NgClass, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { InViewportAction, InViewportDirective } from 'ng-in-viewport';

@Component({
  standalone: true,
  selector: 'invp-ex-page-infinite-scroll',
  templateUrl: './page-infinite-scroll.component.html',
  styleUrls: ['./page-infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgClass, NgForOf, NgIf, MatButtonModule, MatCardModule, MatProgressSpinnerModule, InViewportDirective],
})
export class PageInfiniteScrollComponent {
  public page = signal<number>(1);

  public pages = signal<number>(20).asReadonly();

  public loading = signal<boolean>(false);

  public cards = signal<string[]>(PageInfiniteScrollComponent.generateCards());

  private readonly destroyRef = inject(DestroyRef);

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly router = inject(Router);

  constructor() {
    effect(async () => {
      await this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge',
        queryParams: {
          page: this.page(),
        },
      });
    });
  }

  private static generateCards(): string[] {
    return Array.from({ length: 5 }, () => crypto.randomUUID());
  }

  public loadMore(event: InViewportAction | Event): void {
    if (this.page() >= this.pages() || ('visible' in event && !event.visible)) {
      return;
    }

    this.loading.set(true);

    of(PageInfiniteScrollComponent.generateCards())
      .pipe(delay(1000), takeUntilDestroyed(this.destroyRef))
      .subscribe((cards) => {
        this.loading.set(false);
        this.page.update((page) => page + 1);
        this.cards.update((prevCards) => [...prevCards, ...cards]);
      });
  }

  public trackByItem(index: number, item: string): string {
    return item;
  }
}

export default PageInfiniteScrollComponent;
