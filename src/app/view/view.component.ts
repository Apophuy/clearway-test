import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { Data } from '../../types';

@Component({
  selector: 'app-view',
  imports: [CommonModule, MatListModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
})
export class ViewComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
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

  ngOnDestroy(): void {
    this.sub$?.unsubscribe();
    this.dataSubscription$?.unsubscribe();
  }
}
