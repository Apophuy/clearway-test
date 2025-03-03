import { Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { resize } from '../utils';

@Directive({
  selector: '[appPosition]',
})
export class PositionDirective {
  private image: HTMLDivElement;
  @Input('zoom') zoom: number = 1;

  constructor(private el: ElementRef<HTMLDivElement>) {
    this.image = el.nativeElement;
  }

  @HostBinding('style.top') get top() {
    return `${resize(this.zoom)}px`;
  }
}
