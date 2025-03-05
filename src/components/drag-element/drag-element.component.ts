import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AnnotationItem, Position } from '../../types';

@Component({
  selector: 'app-drag-element',
  imports: [CdkDrag, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './drag-element.component.html',
  styleUrl: './drag-element.component.scss',
})
export class DragElementComponent {
  @Input() boundary!: string | ElementRef<HTMLDivElement>;
  @Input() data!: AnnotationItem;
  @Input() changePosition!: (item: AnnotationItem, position: Position) => void;
  @Input() deleteItem!: (itemId: string) => void;
  @Input() savedPosition: { x: number; y: number } = { x: 0, y: 0 };
  @ViewChild('dragElement', { static: false }) dragElement: ElementRef<HTMLDivElement> | undefined;
  onAnnotationClick(event: Event) {
    event.stopPropagation();
  }

  onDragEnd(event: CdkDragEnd, data: AnnotationItem) {
    const dragPosition = event.source.getFreeDragPosition();
    if (data.itemId !== undefined) {
      this.changePosition(data, dragPosition);
    }
  }

  ngAfterViewInit() {
    if (this.dragElement) {
      this.dragElement.nativeElement.style.transform = `translate3d(${this.savedPosition.x}px, ${this.savedPosition.y}px, 0px)`;
    }
  }

  onDelete(id: string) {
    this.deleteItem(id);
  }
}
