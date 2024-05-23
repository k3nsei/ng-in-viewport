import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'ngi-ex-infinite-scroll-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, NgOptimizedImage],
})
export class PostComponent {
  public avatar = input.required<string>();

  public title = input.required<string>();

  public subtitle = input.required<string>();

  public body = input<string>(
    [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque porta',
      'lorem id nulla varius dictum. Suspendisse ut ante ac odio finibus fringilla',
      'id quis nulla. Etiam sapien elit, facilisis ut mattis non, euismod ac magna.',
      'Donec vehicula, mi ac bibendum finibus, mauris turpis malesuada tellus,',
      'accumsan feugiat felis mi in velit. Donec vitae sollicitudin eros.',
      'Vestibulum hendrerit magna urna, ut malesuada sem fringilla sit amet. Cras',
      'non tellus posuere nibh tincidunt pellentesque. Nunc mattis finibus',
      'accumsan. Aenean fringilla sapien ut quam posuere tempus. Class aptent',
      'taciti sociosqu ad litora torquent per conubia nostra, per inceptos',
      'himenaeos. Pellentesque interdum sit amet dui id auctor. Donec in gravida',
      'ex. Duis convallis tellus at lacus euismod suscipit sed quis risus. In',
      'varius urna ipsum, eget varius eros viverra in.',
    ].join(' '),
  );
}
