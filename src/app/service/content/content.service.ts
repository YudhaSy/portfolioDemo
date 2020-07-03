import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Page} from "../../model/page.model";

export enum DataItemType {
  NonList = 'nonList',
  List = 'list',
  TextLine = 'textLine'
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) {}

  //todo add unit tests to this service
  /**
   * Get JSON content
   */
  getContentJSON(): Observable<Page> {
    return this.http.get<Page>("../../../assets/files/contentData.json").pipe(
      map(data => new Page().deserialize(data)),
      catchError(() => throwError('Data not found'))
    );
  }
}
