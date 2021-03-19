import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {TokenService} from '../services/token.service'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private LoggedIn = new BehaviorSubject<boolean>(this.tokenservice.loggedIn());

  authStatus=this.LoggedIn.asObservable();

  constructor(private tokenservice:TokenService) { }

  changeStatus(value:boolean){

    this.LoggedIn.next(value);
  }
}