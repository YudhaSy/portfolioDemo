import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };
  awsAPIUrl = 'https://***.amazonaws.com/';

  constructor(private http: HttpClient) {}

  //todo add unit tests to this service
  /**
   * Send contact email
   *
   * @param body form content
   */
  sendContactEmail(body: any): Observable<any> {
    return this.http.post<any>(this.awsAPIUrl, body, this.httpOptions)
        .pipe(catchError((e) => this.handleError(e)));
  }

  /**
   * handle error (right now only throw error and not handling it in the UI)
   *
   * @param error error object
   */
  private handleError(error: HttpErrorResponse) {
    console.log('error', error);
    // return an observable with a user-facing error message
    return throwError(
        'Internal Error.');
  };
}
