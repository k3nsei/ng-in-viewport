import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'invp-example',
  templateUrl: './invp-example.component.html',
  styleUrls: ['./invp-example.component.scss']
})
export class InvpExampleComponent implements OnInit {
  public elements: number[];

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.elements = Array(100)
      .fill(undefined)
      .map((__, idx) => idx + 1);
  }

  handleAction(entry: IntersectionObserverEntry) {
    if (entry.isIntersecting) {
      this.renderer.addClass(entry.target, 'active');
      this.renderer.removeClass(entry.target, 'inactive');
    } else {
      this.renderer.addClass(entry.target, 'inactive');
      this.renderer.removeClass(entry.target, 'active');
    }
  }
}
