import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Models
import { User } from '../models/user';

// Services
import {TokenService} from '../services/token.service'
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  user: User = null;
  firstname: String = "";
  lastname: String = "";
  email: String = "";

  private LoggedIn = new BehaviorSubject<boolean>(this.tokenservice.loggedIn());

  authStatus=this.LoggedIn.asObservable();

  constructor(private tokenservice:TokenService, private usersService:UsersService ) { }

  changeStatus(value:boolean){
    this.LoggedIn.next(value);
  }

  getUser() {
    if (this.user == null) {
      this.usersService.getUser(this.tokenservice.getId()).subscribe((userLoaded:User) => {
        this.user = userLoaded;
        this.firstname = this.user.firstName;
        this.lastname = this.user.lastName;
        this.email = this.user.email;
        return this.user;
      });  
    } else {
      return this.user;
    }
  }

  loadUser() {
    if (this.user == null && this.tokenservice.getId() != null) {
      this.usersService.getUser(this.tokenservice.getId()).subscribe((userLoaded:User) => {
        this.user = userLoaded;
        this.firstname = this.user.firstName;
        this.lastname = this.user.lastName;
        this.email = this.user.email;
      });  
    }
  }

  remove() {
    this.user = null;
    this.firstname = "";
    this.lastname = "";
    this.email = "";
  }

  getAvatar() {
    if (this.tokenservice.getId() != null) {
      return "../../../assets/images/AvatarDefault.png";
    } else {
      return "../../../assets/images/AvatarDefault.png";
    }
  }
}