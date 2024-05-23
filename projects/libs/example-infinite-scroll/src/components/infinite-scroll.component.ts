import { isPlatformServer, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { InViewportModule } from 'ng-in-viewport';
import { lastValueFrom } from 'rxjs';

import { AutoLoaderDirective } from '../directives';
import { DataService } from '../services/data.service';

import { PostsComponent } from './posts';

@Component({
  standalone: true,
  selector: 'ngi-ex-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatButtonModule,
    MatProgressSpinnerModule,
    InViewportModule,
    NgOptimizedImage,
    AutoLoaderDirective,
    PostsComponent,
  ],
})
export class InfiniteScrollComponent {
  private readonly destroyRef = inject(DestroyRef);

  private readonly platformId = inject(PLATFORM_ID);

  private readonly router = inject(Router);

  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly dataService = inject(DataService);

  protected readonly loading = signal<boolean>(false);

  protected readonly data = signal<{ name: string }[][]>([]);

  protected readonly loadedCount = computed(() => this.data().length);

  constructor() {
    this.loadMore();
  }

  protected async loadMore(): Promise<void> {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.loading.set(true);

    const nextData = await lastValueFrom(this.dataService.getPeople().pipe(takeUntilDestroyed(this.destroyRef)));

    this.data.update((data) => [...data, nextData]);

    this.loading.set(false);
  }

  protected setPageQueryParam(page: number): void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      replaceUrl: true,
      queryParams: { page },
    });
  }
}
