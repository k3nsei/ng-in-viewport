import {Directive, OnInit, ElementRef, Output, EventEmitter, HostListener} from '@angular/core';

@Directive({
  selector: '[in-viewport]'
})

export class InViewport implements OnInit {
  @Output('inViewport') inViewport:EventEmitter<Object>;

  constructor(private _el:ElementRef) {
    this.inViewport = new EventEmitter();
  }

  ngOnInit() {
    this.isInViewport();
  }

  @HostListener('window:resize', ['$event'])
  onViewportResize(event:Event) {
    window.requestAnimationFrame(() => {
      this.isInViewport();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onViewportScroll(event:Event) {
    window.requestAnimationFrame(() => {
      this.isInViewport();
    });
  }

  isInViewport(partial:boolean = true, direction:string = 'both') {
    const el = this._el.nativeElement;

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

    const vVisible = partial ? tViz || bViz : tViz && bViz;
    const hVisible = partial ? lViz || rViz : lViz && rViz;

    let event = {
      target: el,
      value: false
    };

    if (direction === 'both') {
      event['value'] = (elSize && vVisible && hVisible) ? true : false;
    }
    else if (direction === 'vertical') {
      event['value'] = (elSize && vVisible) ? true : false;
    }
    else if (direction === 'horizontal') {
      event['value'] = (elSize && hVisible) ? true : false;
    }

    this.inViewport.emit(event);
  }
}
