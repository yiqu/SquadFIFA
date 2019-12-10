import { Directive, Renderer2, OnInit, ElementRef, RendererStyleFlags2,
  HostListener, HostBinding, Input, ViewChild } from '@angular/core';
import { DateDisplayPipe } from '../pipes/date-display.pipe';
  
/**
 * Date display toggle
 */
@Directive({
  selector: '[dateDisplayType]',
  providers: [DateDisplayPipe]
})
export class DateDisplayToggleDirective implements OnInit{
  @Input()
  dateDisplayType: string;

  @Input()
  dateString: string;

  private type: string;

  @HostListener('click', ['$event']) 
  toggleDateDisplay(event?: Event) {
    this.type = (this.type === "FROMNOW" ? "FULLDATE" : "FROMNOW");
    this.elRef.nativeElement.innerText = this.datePipe.transform(this.dateString, this.type);;
  }

  constructor(private elRef: ElementRef, public datePipe: DateDisplayPipe) {
    this.type = this.dateDisplayType;
  }

  ngOnInit() {
    this.toggleDateDisplay();
  }
}