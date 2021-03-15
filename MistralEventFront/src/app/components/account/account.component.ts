import { Component, OnInit } from '@angular/core';
import { faAt, faSave } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { FileUploadComponent } from '../fileupload/fileupload.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  
  atIcon = faAt;
  saveIcon = faSave;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  changePassword() {
    
  }

  openAvatarUpload() {
    /*const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    
    const modalDialog = this.matDialog.open(FileUploadComponent, dialogConfig);*/

    const modalRef = this.modalService.open(FileUploadComponent);
    modalRef.componentInstance.name = 'World';
  }

}