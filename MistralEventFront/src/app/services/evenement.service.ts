import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evenement } from '../models/evenement';
import { of } from 'rxjs';
import { DeleteResponse, RequestService } from './request.service';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EvenementService extends RequestService {
  eventsTest: Evenement[] = [
    {
      id: 1,
      name: 'test1',
      date: new Date(),
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      type: 'resto',
    },
    {
      id: 2,
      name: 'test2',
      date: new Date(),
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      type: 'rando',
    },
    {
      id: 3,
      name: 'test3',
      date: new Date(),
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      type: 'resto',
    },
    {
      id: 4,
      name: 'test4',
      date: new Date(),
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
      type: 'apéro',
    },
  ];

  constructor(private http: HttpClient) {
    super();
  }

  getEvenements(): Observable<Evenement[]> {
    // return this.http.get<Evenement[]>(this.serverUrl + 'events').pipe(
    //   map((res: Evenement[]) => res),
    //   catchError( this.handleError('evenements', []))
    // );
    return of(this.eventsTest);
  }

  getEvenementById(evenementId: number): Observable<Evenement | null | undefined> {
    // return this.http.get<Evenement>(this.serverUrl + 'events/' + evenementId).pipe(
    //   map((res: Evenement) => res),
    //   catchError(this.handleError('evenement', null))
    // );
    const evenement = this.eventsTest.find((value) => value.id === evenementId);
    return of(evenement);
  }

  addEvenement(evenement: Evenement): Observable<Evenement | null> {
    // return this.http.post(this.serverUrl + 'events', evenement, this.httpOptions).pipe(
    //   map((res: any) => res),
    //   catchError(this.handleError('postevenement', null))
    // );
    this.eventsTest.push(evenement);
    return of(evenement);
  }

  updateEvenementById(evenement: Evenement): Observable<Evenement | null> {
    return this.http.put<Evenement>(this.serverUrl + 'events/' + evenement.id, evenement, this.httpOptions).pipe(
      map((res) => res),
      catchError(this.handleError('update evenement', null))
    )
  }

  deleteEvenementById(evenementId: Evenement): Observable<DeleteResponse> {
    return this.http.delete(this.serverUrl + 'events/' + evenementId, this.httpOptions).pipe(
      map(() => this.deleteSuccess),
      catchError(this.handleError('delete evenement', this.deleteError))
    )
  }
}
