import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawerContent, MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  selector: 'invp-ex-app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule,
  ],
})
export class AppComponent {
  public readonly drawerContent = viewChild(MatDrawerContent, { read: ElementRef });

  public readonly labels = {
    toolbar: 'Example of ng-in-viewport',
    highlighting: 'Highlighting',
    lazyImages: 'Lazy images',
    infiniteScroll: 'Infinite scroll',
  } as const;

  public readonly navLinks = [
    {
      path: '/highlighting',
      label: this.labels.highlighting,
    },
    {
      path: '/lazy-images',
      label: this.labels.lazyImages,
    },
    {
      path: '/infinite-scroll',
      label: this.labels.infiniteScroll,
    },
  ] as const;

  public scrollTop(): void {
    const ref = this.drawerContent();

    if (ref) {
      ref.nativeElement.scrollTop = 0;
    }
  }
}
