import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { ZoomService } from '../../services/zoom.service';
import { getCurrentPageId } from '../../utils';

@Component({
  selector: 'app-toolbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
  public currentPageName = '';
  dataSubscription$: Subscription | undefined;
  constructor(
    private router: Router,
    private dataService: DataService,
    public zoomService: ZoomService,
  ) {}

  goHome() {
    this.router.navigate(['/']);
    this.zoomService.currentZoomLevel = 1;
  }

  ngDoCheck(): void {
    const pageId = getCurrentPageId(this.router.url);
    if (pageId !== null) {
      this.dataSubscription$ = this.dataService.getDataByPage(pageId).subscribe((data) => {
        this.currentPageName = data.name;
      });
    } else {
      this.currentPageName = '';
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription$?.unsubscribe();
  }
}
