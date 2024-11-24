import { OrderListComponent } from './@pages/order-list/order-list.component';
import { Routes } from '@angular/router';

import { HomeComponent } from './@pages/home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'order-list',
    component: OrderListComponent,
  },
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
