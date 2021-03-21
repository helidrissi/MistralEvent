import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Environnement
import { BASE_URL_API } from 'src/environments/environment';

// Models
import { User } from '../models/user';


@Injectable({
    providedIn: 'root'
  })
  export class UsersService {
  
    baseUrl= BASE_URL_API.url_api_v + 'users/';

    user: User = null;

    constructor(private http:HttpClient) { }

    getUser(userId: string) {  
      return this.http.get<User>(`${this.baseUrl}${userId}`); 
    }  
    
}