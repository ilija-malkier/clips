import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ModalService} from "../../app/services/modal.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements  OnInit,OnDestroy{


  constructor(public modalService:ModalService) {
  }
  ngOnInit(): void {

    this.modalService.register('auth');
  }

  ngOnDestroy(): void {
    this.modalService.unregister('auth');
  }

}
