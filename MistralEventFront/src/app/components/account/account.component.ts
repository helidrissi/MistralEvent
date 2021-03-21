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
import { UploadService } from 'src/app/services/upload.service';

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

  newPwdSave: boolean;

  constructor(private users: UsersService, public account: AccountService, private modalService: NgbModal, public fb: FormBuilder, public uploadService: UploadService) {

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

    this.changePasswordForm.get('oldpassword').setValue("");
    this.changePasswordForm.get('newpassword').setValue("");
    this.changePasswordForm.get('newpassword2').setValue("");
    this.newPwdSave = true;
  }

  openAvatarUpload() {
    this.uploadService.type_file = this.uploadService.TYPE_AVATAR;
    const modalRef = this.modalService.open(FileUploadComponent);
  }

}