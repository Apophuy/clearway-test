import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Data } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonDataUrl = '/data/data.json';

  constructor(private http: HttpClient) {}

  getAllData(): Observable<Data[]> {
    return this.http.get<Data>(this.jsonDataUrl).pipe(map((data) => [data]));
  }

  getDataByPage(pageId: number): Observable<Data> {
    return this.getAllData().pipe(map((data) => data[pageId - 1]));
  }
}
