import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Models
import { File } from '../models/file';


@Injectable({
    providedIn: 'root'
  })
  export class FilesService {
  
    baseUrl="http://localhost:8080/api/v1/image/get/";

    constructor(private http:HttpClient) { }

    getFile(name: string) {  
        return this.http.get<File>(`${this.baseUrl}${name}`); 
    }  
    
}