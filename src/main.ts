import { register } from 'swiper/element/bundle';

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

register();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err),
);
