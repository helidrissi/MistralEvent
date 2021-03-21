import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { BASE_URL_API } from '../../environments/environment';
import { Evenenement } from '../models/evenement';

@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  SERVER_URL = BASE_URL_API.url_api_v + 'events';

  constructor(private http: HttpClient) {
  }

  getEvenements(): Observable<Evenenement[]> {
    return this.http.get<Evenenement[]>(this.SERVER_URL).pipe(
      map((res: Evenenement[]) => res),
    );
  }

  getEvenementById(evenementId: number): Observable<Evenenement | null | undefined> {
    return this.http.get<Evenenement>(this.SERVER_URL + '/' + evenementId).pipe(
      map((res: Evenenement) => res),
    );
  }

  getEvenementsByUser(userId: number): Observable<Evenenement[]> {
    return this.http.get<Evenenement[]>( this.SERVER_URL + '/' + userId).pipe(
      map((res: Evenenement[]) => res)
    );
  } 

  addEvenement(evenement: Evenenement): Observable<Evenenement | null> {
    return this.http.post(this.SERVER_URL + 'events', evenement).pipe(
      map((res: any) => res),
    );
    
  }

  updateEvenementById(evenement :Evenenement): Observable<Evenenement | null> {
    return this.http.put<Evenenement>(this.SERVER_URL + 'events/' + evenement.id, evenement).pipe(
      map((res)=> res),
    )
  }

  deleteEvenementById(evenement: Evenenement): Observable<any> {
    return this.http.delete(this.SERVER_URL + 'events/' + evenement.id).pipe(
      map(() => true),
      catchError((err)=> err)
    )
  }
}
