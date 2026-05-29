import { Directive, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[inViewportDestroyable]',
})
export class DestroyableDirective implements OnDestroy {
  readonly #destroyed$$ = new ReplaySubject<void>(1);

  public readonly destroyed$: Observable<void> = this.#destroyed$$.asObservable();

  public ngOnDestroy(): void {
    if (!this.#destroyed$$.closed) {
      this.#destroyed$$.next();
      this.#destroyed$$.complete();
    }
  }
}
