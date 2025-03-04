import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Annotation, AnnotationItem, Data, Page } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonDataUrl = '/data/data.json';
  currentDocId: number | null = null;
  currentPageId: number | null = null;
  annotation: Annotation[] = [];
  isImage = false;
  isText = false;
  currentAnnId = 0;

  constructor(private http: HttpClient) {
    console.log('tut');
  }

  getAllData(): Observable<Data[]> {
    return this.http.get<Data>(this.jsonDataUrl).pipe(map((data) => [data]));
  }

  getDataByPage(pageId: number): Observable<Data> {
    return this.getAllData().pipe(map((data) => data[pageId - 1]));
  }

  addAnnotationItem(item: AnnotationItem, page: Page, docId: number) {
    const currentPage = this.annotation.find((a) => a.pageId === page.pageId);
    if (!currentPage) {
      this.annotation.push({ pageId: page.pageId, items: [item], imageUrl: page.imageUrl });
    } else {
      currentPage.items.push(item);
    }
  }

  getAnnId() {
    if (this.currentDocId && this.currentPageId) {
      this.currentAnnId = +1;
      return `${this.currentDocId}-${this.currentPageId}-${this.currentAnnId}`;
    }

    // Тут нужно бы добавить всплывающую подсказку с ошибкой.
    return 'Не достаточно данных для генерации ID';
  }

  printAnnotation() {
    console.log(this.annotation);
  }
}
