import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DragElementComponent } from '../../components/drag-element/drag-element.component';
import { PositionDirective } from '../../directives/position.directive';
import { ResizeDirective } from '../../directives/resize.directive';
import { DataService } from '../../services/data.service';
import { ZoomService } from '../../services/zoom.service';
import { Data } from '../../types';
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
  @ViewChild('boundary', { static: false }) boundary: ElementRef<HTMLDivElement> | undefined;
  sub$: Subscription | undefined;
  pageId: number = 0;
  data: Data | undefined;
  dataSubscription$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    public zoomService: ZoomService,
  ) {}

  openModal(itemNumber: number) {
    this.dialog.open(ModalComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
    });
  }

  ngOnInit(): void {
    this.sub$ = this.route.params.subscribe((params) => {
      this.pageId = params['pageId'];
    });

    this.dataSubscription$ = this.dataService.getDataByPage(this.pageId).subscribe((data) => {
      this.data = data;
    });
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
    this.dataSubscription$?.unsubscribe();
  }
}
