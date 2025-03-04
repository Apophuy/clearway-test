import { Injectable } from '@angular/core';
import { Annotation, AnnotationItem } from '../types';

@Injectable({
  providedIn: 'root',
})
export class DragPositionService {
  annotation: Annotation[] = [];

  constructor() {}

  addAnnotationItem(item: AnnotationItem, pageId: number) {
    const currentPage = this.annotation.find((a) => a.pageId === pageId);
    if (!currentPage) {
      this.annotation.push({ pageId, items: [item] });
    } else {
      currentPage.items.push(item);
    }
  }
}
