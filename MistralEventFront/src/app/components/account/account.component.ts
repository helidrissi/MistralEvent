import { Component, OnInit } from '@angular/core';
import { faAt, faSave } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormsModule, FormBuilder } from '@angular/forms';

// Services
import { AccountService } from '../../services/account.service';
import { UsersService } from '../../services/users.service';

// Models
import { User } from '../../models/user';

// Components
import { FileUploadComponent } from '../fileupload/fileupload.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  
  atIcon = faAt;
  saveIcon = faSave;

  selectGroupsForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(private users: UsersService, public account: AccountService, private modalService: NgbModal, public fb: FormBuilder) {

    this.account.loadUser();

    this.selectGroupsForm = this.fb.group({
    })

    this.changePasswordForm = this.fb.group({

      oldpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newpassword2: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  ngOnInit(): void {
  }

  selectGroups() {
    
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