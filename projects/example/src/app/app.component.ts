import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
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
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgForOf,
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
  @ViewChild(MatDrawerContent, { read: ElementRef, static: true })
  public readonly drawerContent!: ElementRef;

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
    if (this.drawerContent) {
      this.drawerContent.nativeElement.scrollTop = 0;
    }
  }
}
