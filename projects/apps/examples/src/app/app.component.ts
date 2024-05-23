import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavContent, MatSidenavModule } from '@angular/material/sidenav';

import { map } from 'rxjs/operators';

import { HeaderComponent, HeaderLink } from './header/header.component';

@Component({
  standalone: true,
  selector: 'ngi-ex-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterModule, MatButtonModule, MatIconModule, MatSidenavModule, HeaderComponent, MatListModule],
})
export class AppComponent {
  private readonly breakpointObserver = inject(BreakpointObserver);

  protected readonly links = [
    {
      path: '/highlighting',
      label: 'Highlighting',
    },
    {
      path: '/lazy-images',
      label: 'Lazy images',
    },
    {
      path: '/infinite-scroll',
      label: 'Infinite scroll',
    },
  ] satisfies HeaderLink[];

  protected readonly isSmallDevice = toSignal(
    this.breakpointObserver.observe([Breakpoints.Handset]).pipe(map((state) => state.matches)),
  );

  private readonly contentRef = viewChild.required(MatSidenavContent, {
    read: ElementRef,
  });

  public scrollTop(): void {
    this.contentRef().nativeElement.scroll({
      left: 0,
      top: 0,
      behavior: 'smooth',
    });
  }
}
