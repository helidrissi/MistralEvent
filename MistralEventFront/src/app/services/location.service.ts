import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BASE_URL_API } from 'src/environments/environment';

// Modèles
import { Location } from '../models/location';



@Injectable({
    providedIn: 'root'
  })
  export class LocationService {
  
    baseUrl= BASE_URL_API.url_api_v + 'locations/';

    constructor(private http:HttpClient) { }

    getAllLocations(): Observable<Location[]> {
        return this.http.get<Location[]>(`${this.baseUrl}`).pipe(
            map((res: Location[]) => res)
        );
    }

    getLocationById(idLocation: number): Observable<Location> {
        return this.http.get<Location>(`${this.baseUrl}${idLocation}`).pipe(
            map((res: Location) => res)
        );
    }
    
    addLocation(location: Location): Observable<Location> {
        return this.http.post<Location>(`${this.baseUrl}`, location).pipe(
            map((res: Location) => res)
        );
    }

    updateLocationById(location: Location): Observable<Location> {
        return this.http.put<Location>(`${this.baseUrl}${location.id}`, location).pipe(
            map((res: Location) => res)
        );
    }

    deleteLocationById(location: Location): Observable<any> {
        return this.http.delete<Location>(`${this.baseUrl}${location.id}`).pipe(
            map(() => true),
            catchError(err => err)
        );
    }
}
