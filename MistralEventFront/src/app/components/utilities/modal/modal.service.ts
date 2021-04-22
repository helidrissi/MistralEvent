import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';

export interface buttonsLibelle  {
  buttonSuccess?: string,
  buttonDanger?: string
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  buttonsLibelle: buttonsLibelle = {
    buttonSuccess: "oui",
    buttonDanger: "non"
  }

  modalOption: NgbModalOptions = {
    size: 'md'
  }

  constructor(private NgbModal: NgbModal) { }

  open(title: string , size?:string,  buttons?: buttonsLibelle) {
    if (size) {
      this.modalOption.size = size;
    }
    
    const modalRef = this.NgbModal.open(ModalComponent, this.modalOption);

    modalRef.componentInstance.title = title;

    if (buttons) {
      modalRef.componentInstance.buttonsLibelle = buttons;
    } else {
      modalRef.componentInstance.buttonsLibelle = this.buttonsLibelle
    }
    return modalRef;
  }

  

}
