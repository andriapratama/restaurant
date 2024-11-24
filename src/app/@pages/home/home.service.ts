import { LoaderService } from './../../@components/loader/loader.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private loader: LoaderService) {}

  async postOder(): Promise<void> {
    this.loader.show();

    setTimeout(() => {
      this.loader.hidden();
    }, 3000);
  }
}
