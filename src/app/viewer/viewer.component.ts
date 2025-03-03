import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
import { ZoomService } from '../../services/zoom.service';
import { Data } from '../../types';

@Component({
  selector: 'app-viewer',
  imports: [MatListModule, MatIconModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './viewer.component.html',
  styleUrl: './viewer.component.scss',
})
export class ViewerComponent {
  data: Data[] = [];
  showChild = false;

  dataSubscription$: Subscription | undefined;

  constructor(
    private dataService: DataService,
    private router: Router,
    public zoomService: ZoomService,
  ) {}

  ngOnInit(): void {
    this.dataSubscription$ = this.dataService.getAllData().subscribe((data) => {
      this.data = data;
    });
  }

  onShowChild(id: number): void {
    this.showChild = !this.showChild;
    this.router.navigate(['/viewer', 'view', id]);
  }

  ngOnDestroy(): void {
    this.dataSubscription$?.unsubscribe();
  }
}
