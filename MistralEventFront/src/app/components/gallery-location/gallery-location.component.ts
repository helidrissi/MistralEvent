import { Component, OnInit } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

// Components
import { PictureLocationComponent } from '../picture-location/picture-location.component';

// Services
import { EditedLocationService } from 'src/app/services/edited-location.service';

@Component({
  selector: 'app-gallery-location',
  templateUrl: './gallery-location.component.html',
  styleUrls: ['./gallery-location.component.scss']
})

export class GalleryLocationComponent implements OnInit {
  
  closeIcon = faTimes;

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal, public editedLocation: EditedLocationService) {
 
  }

  ngOnInit(): void {
  }

  displayImage() {
    const modalRef = this.modalService.open(PictureLocationComponent, { size: 'lg', backdrop: 'static' });
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.activeModal.dismiss();
  }
}