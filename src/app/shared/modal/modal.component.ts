import {Component, ElementRef, Input, OnDestroy} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements  OnDestroy{
  ngOnDestroy(): void {
    //jer je deo body-ja nece da se remove moramo remote to da uradimoi
    document.body.removeChild(this.el.nativeElement);
  }

  @Input() modalID='';


  constructor(public modalService:ModalService,public el:ElementRef) {
  }

  isModalOpen(){
    return ! this.modalService.isModalOpen(this.modalID);
  }
  closeModal($event: Event) {
    $event.preventDefault();
    this.modalService.toggleModal(this.modalID);
  }
}
