import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({ selector: '[appResaltar]', standalone: true })
export class ResaltarDirective {
  @Input() appResaltar = '#1a2a4a';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = this.appResaltar;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }
}