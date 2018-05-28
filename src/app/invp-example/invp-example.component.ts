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

  handleAction({ target = null, visible = false }) {
    const addClass = visible ? 'active' : 'inactive';
    this.renderer.addClass(target, addClass);

    const rmClass = visible ? 'inactive' : 'active';
    this.renderer.removeClass(target, rmClass);
  }
}
