import { HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BASE_URL_API } from 'src/environments/environment';
import { Observable, of } from 'rxjs';


@Injectable()
export class RequestService {
  protected serverUrl = BASE_URL_API.url_api;
  protected httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  protected deleteError: DeleteResponse = { error: true };
  protected deleteSuccess: DeleteResponse = { error: false };

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}

export interface DeleteResponse {
  error: boolean;
}
