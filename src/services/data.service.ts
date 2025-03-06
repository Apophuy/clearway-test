import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Annotation, AnnotationItem, Data, Position } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private jsonDataUrl = '/data/data.json';
  currentDocId: number | null = null;
  currentPageId: number | null = null;
  annotation: Annotation[] = [];
  currentAnnId = 0;

  constructor(private http: HttpClient) {}

  getAllData(): Observable<Data[]> {
    return this.http.get<Data>(this.jsonDataUrl).pipe(map((data) => [data]));
  }

  getDataByPage(pageId: number): Observable<Data> {
    return this.getAllData().pipe(map((data) => data[pageId - 1]));
  }

  addAnnotationItem(item: AnnotationItem) {
    if (this.currentDocId !== null && this.currentPageId !== null) {
      let docIdx = this.annotation.findIndex((doc) => doc.docId === this.currentDocId);
      if (docIdx === -1) {
        docIdx = 0;
        this.annotation.push({ docId: this.currentDocId, items: [] });
      }
      let pageIdx = this.annotation[docIdx].items.findIndex(
        (page) => page.pageId === this.currentPageId,
      );

      if (pageIdx === -1) {
        const pageLength = this.annotation[docIdx].items.length;
        if (pageLength !== 0) {
          pageIdx = pageLength;
        } else {
          pageIdx = 0;
        }
        this.annotation[docIdx].items.push({ pageId: this.currentPageId, items: [] });
      }
      this.annotation[docIdx].items[pageIdx].items.push(item);
    }
  }

  getAnnId() {
    if (this.currentDocId && this.currentPageId) {
      const id = `${this.currentDocId}-${this.currentPageId}-${this.currentAnnId}`;
      this.currentAnnId += 1;
      return id;
    }
    // Тут нужно бы добавить всплывающую подсказку с ошибкой.
    return null;
  }

  onPositionChange = (item: AnnotationItem, position: Position) => {
    if (this.currentDocId !== null && this.currentPageId !== null) {
      const docIdx = this.annotation.findIndex((doc) => doc.docId === this.currentDocId);
      const pageIdx = this.annotation[docIdx].items.findIndex(
        (page) => page.pageId === this.currentPageId,
      );

      this.annotation[docIdx].items[pageIdx].items.forEach((entry) => {
        if (entry.itemId === item.itemId) {
          entry.position = {
            x: position.x,
            y: position.y,
          };
        }
      });
    }
  };

  onDeleteItem = (itemId: string) => {
    const attrArray = itemId.split('-');
    const docId = Number(attrArray[0]);
    const pageId = Number(attrArray[1]);
    const docIdx = this.annotation.findIndex((doc) => doc.docId === docId);
    const pageIdx = this.annotation[docIdx].items.findIndex((page) => page.pageId === pageId);
    const itemIdx = this.annotation[docIdx].items[pageIdx].items.findIndex(
      (entry) => entry.itemId === itemId,
    );
    this.annotation[docIdx].items[pageIdx].items.splice(itemIdx, 1);
  };

  printAnnotation() {
    console.log('Annotations: ', this.annotation);
  }
}
