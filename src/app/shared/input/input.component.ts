import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  @Input() myformControl:FormControl=new FormControl();
  @Input() placeholder:string='ese';
  @Input() type:string='text';
  @Input() format:string='';
}
