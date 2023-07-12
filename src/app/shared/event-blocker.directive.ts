import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appEventBLocker]'
})
export class EventBLockerDirective {

  constructor() { }

  @HostListener('drop',['$event'])
  @HostListener('dragover',['$event'])
  public handleEvent(event:Event){
    event.preventDefault();

  }
}
