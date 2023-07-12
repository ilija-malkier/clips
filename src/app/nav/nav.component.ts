import { Component } from '@angular/core';
import {ModalService} from "../services/modal.service";
import {AuthService} from "../../user/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {


  constructor(public modalService:ModalService,public auth:AuthService) {
  }

  openModal($event: Event) {
    $event.preventDefault();
    this.modalService.toggleModal('auth');
  }

  logout($event: MouseEvent) {
    $event.preventDefault();
    this.auth.logout();

  }
}
