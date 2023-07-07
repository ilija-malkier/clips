import {Component, ElementRef, Input} from '@angular/core';
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

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
