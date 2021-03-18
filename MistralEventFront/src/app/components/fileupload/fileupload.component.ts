import { Component, OnInit } from '@angular/core';
import { faCloudUploadAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})

export class FileUploadComponent implements OnInit {
  
  uploadIcon = faCloudUploadAlt;
  closeIcon = faTimes;

  fileuplaod_title = "Avatar";
  fileuplaod_text = "Sélectionner une image pour votre avatar";

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // When the user clicks the action button a.k.a. the logout button in the\
  // modal, show an alert and followed by the closing of the modal
  actionFunction() {
    this.closeModal();
  }

  // If the user clicks the cancel button a.k.a. the go back button, then\
  // just close the modal
  closeModal() {
    this.modalService.dismissAll();
  }

}