import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
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
  @Input() boundaryId?: ElementRef<HTMLDivElement>;
  @Input() data!: AnnotationItem;
  @Input() changePosition!: (item: AnnotationItem, position: Position) => void;
  @Input() deleteItem!: (itemId: string) => void;
  dragPosition = { x: 0, y: 0 };

  onAnnotationClick(event: Event) {
    event.stopPropagation();
  }

  onDragEnd(event: CdkDragEnd, data: AnnotationItem) {
    this.dragPosition = event.source.getFreeDragPosition();
    if (data.itemId !== undefined) {
      this.changePosition(data, this.dragPosition);
    }
  }

  onDelete(id: string) {
    this.deleteItem(id);
  }
}
