import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appResize]',
})
export class ResizeDirective {
  private image: HTMLDivElement;
  @Input('zoom') zoom: number = 1;

  constructor(private el: ElementRef<HTMLDivElement>) {
    this.image = el.nativeElement;
  }

  @HostBinding('style.transform') get transform(): string {
    return `scale(${this.zoom})`;
  }
}
