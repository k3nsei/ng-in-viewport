import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

export type HeaderLink = {
  path: string;
  label: string;
};

@Component({
  standalone: true,
  selector: 'ngi-ex-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, MatButtonModule, MatIconModule, MatTabsModule, MatToolbarModule],
  exportAs: 'ngiExHeader',
})
export class HeaderComponent {
  public title = input.required<string>();

  public links = input.required<HeaderLink[]>();

  public sidebarRef = input<MatSidenav>();

  public toggleMenu(): void {
    this.sidebarRef()?.toggle();
  }
}
