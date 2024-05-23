import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';

import { PostComponent } from '../post';

@Component({
  standalone: true,
  selector: 'ngi-ex-infinite-scroll-posts',
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PostComponent],
})
export class PostsComponent {
  public data = input.required({
    transform: (value?: Person[]): Person[] => {
      return Array.isArray(value) ? value : [];
    },
  });

  public pageNumber = input.required({ transform: numberAttribute });
}

type Person = {
  name: string;
};
