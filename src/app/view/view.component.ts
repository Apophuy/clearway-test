import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PositionDirective } from '../../directives/position.directive';
import { ResizeDirective } from '../../directives/resize.directive';
import { DataService } from '../../services/data.service';
import { ZoomService } from '../../services/zoom.service';
import { Data } from '../../types';

@Component({
  selector: 'app-view',
  imports: [CommonModule, ResizeDirective, PositionDirective],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent implements OnInit {
  @ViewChild('doc', { static: false }) doc: ElementRef<HTMLDivElement> | undefined;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    public zoomService: ZoomService,
  ) {}

  sub$: Subscription | undefined;
  pageId: number = 0;
  data: Data | undefined;
  dataSubscription$: Subscription | undefined;

  ngOnInit(): void {
    this.sub$ = this.route.params.subscribe((params) => {
      this.pageId = params['pageId'];
    });

    this.dataSubscription$ = this.dataService.getDataByPage(this.pageId).subscribe((data) => {
      this.data = data;
    });
  }

  ngDoCheck(): void {
    console.log('ngDoCheck', this.pageId, this.data);
  }

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
    this.dataSubscription$?.unsubscribe();
  }
}
