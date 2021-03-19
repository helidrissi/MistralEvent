import { Component, OnInit } from '@angular/core';
import { faAt, faSave } from '@fortawesome/free-solid-svg-icons';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FileUploadComponent } from '../fileupload/fileupload.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  
  atIcon = faAt;
  saveIcon = faSave;

  constructor(public matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  changePassword() {
    
  }

  openAvatarUpload() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    
    const modalDialog = this.matDialog.open(FileUploadComponent, dialogConfig);
  }

}