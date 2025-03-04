import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input } from '@angular/core';
import { AnnotationItem, Position } from '../../types';

@Component({
  selector: 'app-drag-element',
  imports: [CdkDrag, CommonModule],
  templateUrl: './drag-element.component.html',
  styleUrl: './drag-element.component.scss',
})
export class DragElementComponent {
  @Input() boundaryId?: ElementRef<HTMLDivElement>;
  @Input() data!: AnnotationItem;
  @Input() changePosition!: (item: AnnotationItem, position: Position) => void;

  onAnnotationClick(event: Event) {
    event.stopPropagation();
  }

  onDragEnd(event: CdkDragEnd, data: AnnotationItem) {
    const position = event.source.getFreeDragPosition();
    if (data.itemId !== undefined) {
      this.changePosition(data, position);
    }
  }
}
