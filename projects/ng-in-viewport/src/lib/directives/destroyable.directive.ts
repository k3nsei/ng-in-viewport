import { Directive, OnDestroy } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Directive({
  standalone: true,
  selector: '[inViewportDestroyable]',
})
export class DestroyableDirective implements OnDestroy {
  public readonly destroyed$: Observable<void>;

  private readonly destroyed$$ = new ReplaySubject<void>(1);

  constructor() {
    this.destroyed$ = this.destroyed$$.asObservable();
  }

  public ngOnDestroy(): void {
    if (this.destroyed$$ && !this.destroyed$$.closed) {
      this.destroyed$$.next();
      this.destroyed$$.complete();
    }
  }
}
