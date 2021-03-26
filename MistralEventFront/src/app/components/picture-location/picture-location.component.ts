import { Component, OnInit } from '@angular/core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { GalleryLocationService } from 'src/app/services/gallery-location.service';

@Component({
  selector: 'app-picture-location',
  templateUrl: './picture-location.component.html',
  styleUrls: ['./picture-location.component.scss']
})

export class PictureLocationComponent implements OnInit {
  
  closeIcon = faChevronLeft;

  constructor(private activeModal: NgbActiveModal, private modalService: NgbModal, public galleryLocationService: GalleryLocationService) {
 
  }

  ngOnInit(): void {
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.activeModal.dismiss();
  }
}