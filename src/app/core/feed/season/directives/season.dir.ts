import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[season-host]',
})
export class SeasonDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
