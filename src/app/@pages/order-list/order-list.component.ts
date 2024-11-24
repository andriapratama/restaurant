import { NavbarComponent } from './../../@components/navbar/navbar.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {}
