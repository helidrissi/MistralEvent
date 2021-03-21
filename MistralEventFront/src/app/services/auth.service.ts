import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

// Environnement
import { BASE_URL_API } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl= BASE_URL_API.url_api_v + 'login';

  constructor(private http:HttpClient) { }

  login(email:string,password:string) {
    return this.http.post(`${this.baseUrl}`,{email,password},{headers:{skip:"true"}})
  } 
}
