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
      .fill(null)
      .map((__, idx) => idx + 1);
  }

  handleAction({ target = null, visible = false }) {
    this.renderer.addClass(target, visible ? 'active' : 'inactive');
    this.renderer.removeClass(target, visible ? 'inactive' : 'active');
  }
}
