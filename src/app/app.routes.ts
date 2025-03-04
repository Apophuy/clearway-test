import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewComponent } from './view/view.component';
import { ViewerComponent } from './viewer/viewer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'viewer',
    component: ViewerComponent,
    children: [{ path: 'view/:docId', component: ViewComponent }],
  },
  { path: '**', redirectTo: '' },
];
