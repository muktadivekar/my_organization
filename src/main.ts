import {
  loadChartIconSet,
  loadCommerceIconSet,
  loadCoreIconSet,
  loadEssentialIconSet,
  loadMediaIconSet,
  loadMiniIconSet,
  loadSocialIconSet,
  loadTechnologyIconSet,
  loadTextEditIconSet,
  loadTravelIconSet,
} from '@cds/core/icon';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { bootstrapApplication } from '@angular/platform-browser';

loadChartIconSet();
loadCommerceIconSet();
loadCoreIconSet();
loadEssentialIconSet();
loadMediaIconSet();
loadMiniIconSet();
loadSocialIconSet();
loadTechnologyIconSet();
loadTextEditIconSet();
loadTravelIconSet();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
