import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DragElementComponent } from '../../components/drag-element/drag-element.component';
import { PositionDirective } from '../../directives/position.directive';
import { ResizeDirective } from '../../directives/resize.directive';
import { DataService } from '../../services/data.service';
import { ZoomService } from '../../services/zoom.service';
import { AnnotationItem, Data, Position } from '../../types';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-view',
  imports: [
    CommonModule,
    ResizeDirective,
    PositionDirective,
    MatButtonModule,
    DragElementComponent,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  // @ViewChildren('boundary') boundaryCollection: QueryList<HTMLDivElement> | undefined;
  sub$: Subscription | undefined;
  docId: number = 0;
  data: Data | undefined;
  dataSubscription$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    public zoomService: ZoomService,
  ) {}

  openModal(itemNumber: number) {
    this.dataService.currentPageId = itemNumber;
    const dialogData = {
      docId: this.docId,
      pageId: itemNumber,
      getAnnId: this.dataService.getAnnId.bind(this.dataService),
      addItem: this.dataService.addAnnotationItem.bind(this.dataService),
    };
    this.dialog.open(ModalComponent, {
      data: dialogData,
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
    });
  }

  getPageAnnotations = (pageId: number) => {
    return (
      this.dataService.annotation
        .find((doc) => doc.docId === this.dataService.currentDocId)
        ?.items.find((page) => page.pageId === pageId)?.items || []
    );
  };

  ngOnInit(): void {
    this.sub$ = this.route.params.subscribe((params) => {
      this.docId = params['docId'];
    });
    // Можно объединить
    this.dataSubscription$ = this.dataService.getDataByPage(this.docId).subscribe((data) => {
      this.data = data;
    });
  }

  ngAfterViewInit() {}

  onChangePosition = (item: AnnotationItem, position: Position) => {
    return this.dataService.onPositionChange(item, position);
  };
  onDeleteItem = (itemId: string) => {
    this.dataService.onDeleteItem(itemId);
  };

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
    this.dataSubscription$?.unsubscribe();
  }
}
