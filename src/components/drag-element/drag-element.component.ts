import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-drag-element',
  imports: [CdkDrag],
  templateUrl: './drag-element.component.html',
  styleUrl: './drag-element.component.scss',
})
export class DragElementComponent {
  @Input() boundaryId: ElementRef<HTMLDivElement> | undefined;
  @Input() text: string = '';
  @Input() image: File | undefined;

  onAnnotationClick(event: Event) {
    event.stopPropagation();
  }

  onDragEnd(event: CdkDragEnd) {
    const { x, y } = event.source.getFreeDragPosition();
  }
}
