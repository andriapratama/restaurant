import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, AngularSvgIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public menuActive: string = '';
  public menuList: { id: string; name: string; icon: string; route: string }[] =
    [
      {
        id: 'home',
        name: 'Home',
        icon: 'assets/images/icons/home.svg',
        route: '/home',
      },
      {
        id: 'order-list',
        name: 'Order List',
        icon: 'assets/images/icons/receipt.svg',
        route: '/order-list',
      },
      {
        id: 'history',
        name: 'History',
        icon: 'assets/images/icons/clock.svg',
        route: '/history',
      },
      {
        id: 'bills',
        name: 'Bills',
        icon: 'assets/images/icons/receipt-text.svg',
        route: '/bills',
      },
      {
        id: 'settings',
        name: 'Settings',
        icon: 'assets/images/icons/cog.svg',
        route: '/settings',
      },
    ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((urlSegments) => {
      this.menuActive = urlSegments[0].path;
    });
  }

  public onRouter(route: string) {
    this.router.navigateByUrl(route);
  }
}
