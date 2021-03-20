import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Models
import { User } from '../models/user';


@Injectable({
    providedIn: 'root'
  })
  export class UsersService {
  
    baseUrl="http://localhost:8080/api/v1/users/";

    user: User = null;

    constructor(private http:HttpClient) { }



    getUser(userId: string) {  
      console.log(`${this.baseUrl}${userId}`);

      return this.http.get<User>(`${this.baseUrl}${userId}`); 
    }  
    
}