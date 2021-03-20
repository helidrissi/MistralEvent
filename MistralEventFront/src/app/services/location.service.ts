import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../models/location';
import { of } from 'rxjs';
import { DeleteResponse, RequestService } from './request.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocationService extends RequestService {

  locationsTest: Location[] = [
    {
      id: 1,
      name: 'testlocation1',

      address: "rue Dupont 1, Clermont",
    },
    {
      id: 2,
      name: 'testlocation2',

      address: "rue Tralala 1, Clermont",
    },

    {
      id: 3,
      name: 'testlocation3',

      address: "rue Tralalu 1, Clermont",
    },


  ];

  constructor(private http: HttpClient) {
    super();
  }

  getLocations(): Observable<Location[]> {
    // return this.http.get<Location[]>(this.serverUrl + 'locations').pipe(
    //   map((res: Location[]) => res),
    //   catchError( this.handleError('Locations', []))
    // );
    return of(this.locationsTest);
  }

  getLocationById(LocationId: number): Observable<Location | null | undefined> {
    // return this.http.get<Location>(this.serverUrl + 'locations/' + LocationId).pipe(
    //   map((res: Location) => res),
    //   catchError(this.handleError('Location', null))
    // );
    const Location = this.locationsTest.find((value) => value.id === LocationId);
    return of(Location);
  }

  addLocation(Location: Location): Observable<Location | null> {
    // return this.http.post(this.serverUrl + 'locations', Location, this.httpOptions).pipe(
    //   map((res: any) => res),
    //   catchError(this.handleError('postLocation', null))
    // );
    this.locationsTest.push(Location);
    return of(Location);
  }

  updateLocationById(Location: Location): Observable<Location | null> {
    return this.http.put<Location>(this.serverUrl + 'locations/' + Location.id, Location, this.httpOptions).pipe(
      map((res) => res),
      catchError(this.handleError('update Location', null))
    )
  }

  deleteLocationById(LocationId: Location): Observable<DeleteResponse> {
    return this.http.delete(this.serverUrl + 'locations/' + LocationId, this.httpOptions).pipe(
      map(() => this.deleteSuccess),
      catchError(this.handleError('delete Location', this.deleteError))
    )
  }
}
