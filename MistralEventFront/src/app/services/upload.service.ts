import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BASE_URL_API } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UploadService {
    SERVER_URL = BASE_URL_API.url_api + 'upload/';

    constructor(private httpClient: HttpClient) {}

    public upload(formData, type: number) {
        if (type == 1) {
            

            return this.httpClient.post<any>(this.SERVER_URL + "avatar", formData, {
                reportProgress: true,
                observe: 'events'
            });
        } else if (type == 2) {
            return this.httpClient.post<any>(this.SERVER_URL + "place-picture", formData, {
                reportProgress: true,
                observe: 'events'
            });
        }
    }
}