/*!
 * @license
 * Copyright (c) 2020 Piotr Stępniewski <k3nsei.pl@gmail.com>
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file in the root directory of this source tree.
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawerContent } from '@angular/material/sidenav';

type AppLabels = { [key: string]: string };

interface NavLink {
  path: string;
  label: string;
}

@Component({
  selector: 'invp-ex-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatDrawerContent, { read: ElementRef })
  public readonly drawerContent!: ElementRef;

  public readonly labels: AppLabels = {
    toolbar: 'Example of ng-in-viewport',
    highlighting: 'Highlighting',
    lazyImages: 'Lazy images',
    infiniteScroll: 'Infinite scroll'
  };

  public readonly navLinks: NavLink[] = [
    {
      path: '/highlighting',
      label: this.labels.highlighting
    },
    {
      path: '/lazy-images',
      label: this.labels.lazyImages
    },
    {
      path: '/infinite-scroll',
      label: this.labels.infiniteScroll
    }
  ];

  public scrollTop(): void {
    if (this.drawerContent) {
      this.drawerContent.nativeElement.scrollTop = 0;
    }
  }
}
