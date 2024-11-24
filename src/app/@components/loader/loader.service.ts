import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public isShowLoader: boolean = false;

  constructor() {}

  public show(): void {
    this.isShowLoader = true;
  }

  public hidden(): void {
    this.isShowLoader = false;
  }
}
