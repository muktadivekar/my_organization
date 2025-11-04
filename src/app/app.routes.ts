import { AppComponent } from './app.component';
import { EmployeeDetailsPageComponent } from './employee-details-page/employee-details-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { Routes } from '@angular/router';
export const routes: Routes = [
  { path: 'employees/:id', component: EmployeeDetailsPageComponent },
  { path: '', component: HomePageComponent, pathMatch: 'full' },
];
