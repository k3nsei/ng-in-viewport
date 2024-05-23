import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { type Observable } from 'rxjs';

@Injectable()
export class DataService {
  protected httpClient = inject(HttpClient);

  public getPeople(): Observable<{ name: string }[]> {
    return this.httpClient.get<{ name: string }[]>('/api/v1/people');
  }
}
