import { Component, OnInit } from '@angular/core';
import { faAt, faSave } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { FormsModule, FormBuilder } from '@angular/forms';

// Services
import { AccountService } from '../../services/account.service';
import { UsersService } from '../../services/users.service';
import { GroupsService } from '../../services/groups.service';

// Models
import { User } from '../../models/user';
import { Group } from 'src/app/models/group';

// Components
import { FileUploadComponent } from '../fileupload/fileupload.component';
import { UploadService } from 'src/app/services/upload.service';
import { AuthService } from 'src/app/services/auth.service';

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
  errorMessage: string;

  groupsSave: boolean;
  errorMessage2: string;

  listGroups: Group[] = [];

  constructor(private users: UsersService, public account: AccountService, private modalService: NgbModal, 
    public fb: FormBuilder, public uploadService: UploadService, private authService: AuthService, 
    private groupsService: GroupsService) {

    this.account.loadUser();

    this.selectGroupsForm = this.fb.group({
    });

    this.changePasswordForm = this.fb.group({

      oldpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      newpassword2: new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.groupsService.getGroups().subscribe((data: Group[]) => {
      this.listGroups = data;
    });
  }

  ngOnInit(): void {
  }

  selectGroups() {
    this.account.saveUser().subscribe((userLoaded:User) => {
      this.errorMessage2 = "";
      this.groupsSave = true;
      this.account.refreshUser(userLoaded);
    }, error => {
      if (error.status === 403) {
        this.errorMessage2 = "Le mot de passe actuel est incorrect";
      }
      else {
        this.errorMessage2 = "Une erreur Serveur est survenue";
      }
    })
  }

  changePassword() {
    if (this.changePasswordForm.get('newpassword') !== this.changePasswordForm.get('newpassword2')) {
      this.authService.login(this.account.email, this.changePasswordForm.get('oldpassword').value).subscribe(res => this.handleResponse(res), error => {
        if (error.status === 403) {
          this.errorMessage = "Le mot de passe actuel est incorrect";
        }
        else {
          this.errorMessage = "Une erreur Serveur est survenue";
        }
      });
    } else {
      this.errorMessage = "Le nouveau mot de passe n'est pas identique dans les 2 champs";
    }
  }

  handleResponse(res:{}) {
    this.account.changePassword(this.account.user.id, this.changePasswordForm.get('newpassword').value).subscribe(res => {
      this.changePasswordForm.get('oldpassword').setValue("");
      this.changePasswordForm.get('newpassword').setValue("");
      this.changePasswordForm.get('newpassword2').setValue("");
      this.errorMessage = "";
      this.newPwdSave = true;
    }, error => {
      if (error.status === 403) {
        this.errorMessage = "Le mot de passe actuel est incorrect";
      }
      else {
        this.errorMessage = "Une erreur Serveur est survenue";
      }
    })
  }

  openAvatarUpload() {
    this.uploadService.type_file = this.uploadService.TYPE_AVATAR;
    const modalRef = this.modalService.open(FileUploadComponent);
  }

}