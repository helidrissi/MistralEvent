import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BASE_URL_API } from '../../environments/environment';
import { Evenement } from '../models/evenement';

@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  SERVER_URL = BASE_URL_API.url_api_v + 'events';

  constructor(private http: HttpClient) {
  }

  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.SERVER_URL).pipe(
      map((res: Evenement[]) => res),
    );
  }

  getEvenementById(evenementId: number): Observable<Evenement | null | undefined> {
    return this.http.get<Evenement>(this.SERVER_URL + '/' + evenementId).pipe(
      map((res: Evenement) => res),
    );
  }

  getEvenementsByUser(userId: number): Observable<Evenement[]> {
    return this.http.get<Evenement[]>( this.SERVER_URL + '/' + userId).pipe(
      map((res: Evenement[]) => res)
    );
  } 

  addEvenement(evenement: Evenement): Observable<Evenement | null> {
    return this.http.post(this.SERVER_URL + 'events', evenement).pipe(
      map((res: any) => res),
    );
    
  }

  updateEvenementById(evenement :Evenement): Observable<Evenement | null> {
    return this.http.put<Evenement>(this.SERVER_URL + 'events/' + evenement.id, evenement).pipe(
      map((res)=> res),
    )
  }

  deleteEvenementById(evenement: Evenement): Observable<any> {
    return this.http.delete(this.SERVER_URL + 'events/' + evenement.id).pipe(
      map(() => true),
      catchError((err)=> err)
    )
  }
}