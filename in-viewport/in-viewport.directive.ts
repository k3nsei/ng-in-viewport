import {Directive, ngAfterViewInit, OnDestroy, ElementRef, Output, EventEmitter} from '@angular/core';
import {InViewportService} from './in-viewport.service';

@Directive({
    selector: '[in-viewport]'
})

export class InViewportDirective implements ngAfterViewInit, OnDestroy {
    @Output('inViewport') inViewport: EventEmitter<Object> = new EventEmitter();

    private eventSub: any;
    private partial: boolean = true;
    private direction: string = 'both';

    constructor(private elementRef: ElementRef, private inViewportService: InViewportService) {
        this.eventSub = this.inViewportService.event$.subscribe(() => this.check());
    }

    ngAfterViewInit() {
        this.check();
    }

    ngOnDestroy() {
        this.eventSub.unsubscribe();
    }

    check() {
        const el = this.elementRef.nativeElement;

        const elSize = (el.offsetWidth * el.offsetHeight);

        const rec = el.getBoundingClientRect();

        const vp = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        const tViz = rec.top >= 0 && rec.top < vp.height;
        const bViz = rec.bottom > 0 && rec.bottom <= vp.height;

        const lViz = rec.left >= 0 && rec.left < vp.width;
        const rViz = rec.right > 0 && rec.right <= vp.width;

        const vVisible = this.partial ? tViz || bViz : tViz && bViz;
        const hVisible = this.partial ? lViz || rViz : lViz && rViz;

        let event = {
            target: el,
            value: false
        };

        if (this.direction === 'both') {
            event['value'] = (elSize && vVisible && hVisible) ? true : false;
        }
        else if (this.direction === 'vertical') {
            event['value'] = (elSize && vVisible) ? true : false;
        }
        else if (this.direction === 'horizontal') {
            event['value'] = (elSize && hVisible) ? true : false;
        }

        this.inViewport.emit(event);
    }
}
