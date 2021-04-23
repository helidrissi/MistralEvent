import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';
import { Evenement } from '../../../models/evenement';
import { DetailEventComponent } from '../../detail-event/detail-event.component';

export interface buttonsLibelle  {
  buttonSuccess?: string,
  buttonDanger?: string
}

enum buttonsType {
  yesNo= "yesNo",
  validerAnnuler= "validerAnnuler"
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  eButtonType = buttonsType;

  modalOption: NgbModalOptions = {
    size: 'md'
  }

  constructor(private NgbModal: NgbModal) { }

  open(title: string ,  typeButtons?: string, size?:string,) {
    console.log(typeButtons)
    if (size) {
      this.modalOption.size = size;
    }
    
    const modalRef = this.NgbModal.open(ModalComponent, this.modalOption);

    modalRef.componentInstance.title = title;

    if(typeButtons && typeButtons === "validerAnnuler") {
      modalRef.componentInstance.buttonsType = this.eButtonType.validerAnnuler;
    } else {
      modalRef.componentInstance.buttonsType = this.eButtonType.yesNo;
    }

    return modalRef;
  }

  openModalEventDetail(event: Evenement) {
    const modalRefDetailEvent = this.NgbModal.open(DetailEventComponent, {
      size: 'lg'
    })
    modalRefDetailEvent.componentInstance.evenement = event;
    return modalRefDetailEvent;
  }

}
