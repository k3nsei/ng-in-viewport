/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { delay, take, takeUntil, tap } from 'rxjs/operators';

const ELEMENTS_PER_PAGE = 5;

@Component({
  selector: 'invp-ex-page-infinite-scroll',
  templateUrl: './page-infinite-scroll.component.html',
  styleUrls: ['./page-infinite-scroll.component.scss']
})
export class PageInfiniteScrollComponent implements OnInit, OnDestroy {
  public readonly loading = new BehaviorSubject<boolean>(false);

  public readonly cards = new BehaviorSubject<any[]>([]);

  public readonly pages: number = 20;

  public page: number = 1;

  private readonly destroyed$ = new Subject<void>();

  public ngOnInit(): void {
    this.cards.next(this.mapCards([...this.generateCards()]));
  }

  public ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public isEven(value: number): boolean {
    return !(value % 2);
  }

  public isOdd(value: number): boolean {
    return !this.isEven(value);
  }

  public loadMore(event: any): void {
    if (this.page >= this.pages || (event && !event.visible)) {
      return;
    }

    of([...this.cards.getValue(), ...this.generateCards()])
      .pipe(
        tap(() => this.loading.next(true)),
        delay(500),
        tap(() => this.loading.next(false)),
        take(1),
        takeUntil(this.destroyed$)
      )
      .subscribe((cards) => {
        this.page += 1;
        this.cards.next(this.mapCards(cards));
      });
  }

  private mapCards(cards: number[]): number[] {
    return cards.fill(1).map((v, k) => v + k);
  }

  private generateCards(): number[] {
    return Array(ELEMENTS_PER_PAGE).fill(1);
  }
}
