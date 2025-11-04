import { Component, OnInit, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppState } from '../models/app.state';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { EmployeeDetailsService } from '../services/employeeDetails.service';
import { LoggerService as Logger } from '../services/logger.service';
import { OrgEmployeeTableComponent } from '../org-employee-table/org-employee-table.component';
import { OrgHierarchyGraphViewComponent } from '../org-hierarchy-graph-view/org-hierarchy-graph-view.component';
import { Store } from '@ngrx/store';
import { initEmployeeList } from '../actions/employees.actions';

@Component({
  selector: 'app-home-page',
  imports: [
    ClarityModule,
    OrgHierarchyGraphViewComponent,
    OrgEmployeeTableComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  employeeDetailsService = inject(EmployeeDetailsService);
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    const list: Employee[] | null = this.employeeDetailsService.get(
      'employeeList',
      []
    );
    if (list !== null && list?.length > 0) {
      this.store.dispatch(initEmployeeList({ employeeList: list }));
    } else {
      Logger.debug('No data added yet');
    }
  }
}
