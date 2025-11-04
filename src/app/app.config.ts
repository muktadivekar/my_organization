import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

import { employeeReducer } from './reducers/employees.reducer';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
//import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore({ employeeList: employeeReducer }),
    provideAnimations(),
  ],
};
