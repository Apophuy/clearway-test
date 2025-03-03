import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ZoomService {
  public currentZoomLevel = 1;
  constructor() {}

  zoomIn() {
    this.currentZoomLevel += 0.1;
  }

  zoomOut() {
    this.currentZoomLevel -= 0.1;
  }
}
