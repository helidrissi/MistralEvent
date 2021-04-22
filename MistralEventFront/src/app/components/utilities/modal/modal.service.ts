import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalOption: NgbModalOptions = {
    size: 'sm'
  }

  constructor(private NgbModal: NgbModal) { }

  open(title: string, size:string = 'sm') {
    this.modalOption.size = size;
    const modalRef = this.NgbModal.open(ModalComponent, this.modalOption);
    modalRef.componentInstance.title = title;
    return modalRef;
  }

}
