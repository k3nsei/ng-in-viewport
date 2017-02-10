import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class InViewportService {
    private scrollListener: any;
    private resizeListener: any;

    public event$: EventEmitter<any>;

    constructor() {
        this.event$ = new EventEmitter();

        this.scrollListener = Observable
            .fromEvent(window, 'scroll', {passive: true})
            .debounceTime(100)
            .subscribe((event) => this.event$.emit(event));

        this.resizeListener = Observable
            .fromEvent(window, 'resize', {passive: true})
            .debounceTime(100)
            .subscribe((event) => this.event$.emit(event));
    }
}
