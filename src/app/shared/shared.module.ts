import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { TabComponent } from './tab/tab.component';
import {TabsContainerComponent} from "./tabs-container/tabs-container.component";
import { InputComponent } from './input/input.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgxMaskDirective} from "ngx-mask";
import { AlertComponent } from './alert/alert.component';
import { EventBLockerDirective } from './event-blocker.directive';



@NgModule({
  declarations: [
    ModalComponent,
    TabComponent,
    TabsContainerComponent,
    InputComponent,
    AlertComponent,
    EventBLockerDirective
  ],
  exports: [
    ModalComponent,
    TabComponent,
    TabsContainerComponent,
    InputComponent,
    AlertComponent,
    EventBLockerDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,


  ]
})
export class SharedModule { }
