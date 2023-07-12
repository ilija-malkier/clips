import { Component } from '@angular/core';
import {AuthService} from "../user/auth.service";
import {ModalService} from "./services/modal.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clips';

  constructor(public auth:AuthService,public modalService:ModalService) {


  }


}
