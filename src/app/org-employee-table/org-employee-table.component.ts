import { Component, OnInit } from '@angular/core';

import { AppState } from '../models/app.state';
import { ClrDatagridModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { EmployeeContextMenuComponent } from '../employee-context-menu/employee-context-menu.component';
import { LoggerService as Logger } from '../services/logger.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllItems } from '../selectors/emploees.selectors';

@Component({
  selector: 'app-org-employee-table',
  imports: [
    CommonModule,
    ClrDatagridModule,
    RouterLink,
    EmployeeContextMenuComponent,
  ],
  templateUrl: './org-employee-table.component.html',
  styleUrl: './org-employee-table.component.css',
})
export class OrgEmployeeTableComponent implements OnInit {
  employeeList$!: Observable<Employee[]>;
  employeeArray: Employee[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.employeeList$ = this.store.select(selectAllItems);
    this.employeeList$.subscribe((array) => {
      Logger.debug('Rendering table');
      this.employeeArray = structuredClone(array);
      this.employeeArray.map((employee, index) => {
        if (employee.parentId) {
          let manager = array.find((e) => e.id === employee.parentId);
          if (manager) {
            this.employeeArray[index].managerName = manager.name;
          }
        }
      });
    });
  }
}
