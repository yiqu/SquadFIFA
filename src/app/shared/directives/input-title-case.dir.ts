import { Directive, Renderer2, OnInit, ElementRef, RendererStyleFlags2,
  HostListener, HostBinding, Input, ViewChild } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
  
/**
 * Title Case directive
 */
@Directive({
  selector: '[inputTitleCase]',
})
export class InputTitleCaseDirective implements OnInit {

  @HostListener('keyup', ['$event'])
  toggleDateDisplay() {
    const innerText: string = this.elRef.nativeElement.value;
    this.elRef.nativeElement.value = this.tcp.transform(innerText)
  }

  constructor(private elRef: ElementRef, public tcp: TitleCasePipe, public renderer: Renderer2) {
  }

  ngOnInit() {
  }
}

@Directive({
  selector: '[inputGoalTimeFormat]',
})
export class InputGoalTimeDirective implements OnInit {

  @HostListener('keydown', ['$event'])
  toggleDateDisplay() {
    const innerText: string = this.elRef.nativeElement.value;
    const alreadyExist: boolean = innerText.slice(-1) === "'";
    if (!alreadyExist) {
      this.elRef.nativeElement.value = innerText + "'";
    }
  }

  constructor(private elRef: ElementRef, public tcp: TitleCasePipe, public renderer: Renderer2) {
  }

  ngOnInit() {
  }
}