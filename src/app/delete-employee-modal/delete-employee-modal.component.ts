import { Component, EventEmitter, Input, Output, inject } from '@angular/core';

import { AppState } from '../models/app.state';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { EmployeeDetailsService } from '../services/employeeDetails.service';
import { FormsModule } from '@angular/forms';
import { LoggerService as Logger } from '../services/logger.service';
import { Store } from '@ngrx/store';
import { initEmployeeList } from '../actions/employees.actions';
import { selectAllItems } from '../selectors/emploees.selectors';

@Component({
  selector: 'app-delete-employee-modal',
  imports: [ClarityModule, CommonModule, FormsModule],
  templateUrl: './delete-employee-modal.component.html',
  styleUrl: './delete-employee-modal.component.css',
})
export class DeleteEmployeeModalComponent {
  employeeList: Employee[] = [];

  @Input() employee!: Employee;
  @Input() openDeleteModal = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  employeeDetailsService = inject(EmployeeDetailsService);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    let list = this.store.select(selectAllItems);
    list.subscribe((array) => {
      this.employeeList = [...array];
    });
  }
  close() {
    this.onClose.emit();
  }

  onSubmit() {
    Logger.debug(`Deleting employee ${this.employee.id}`);
    let list = structuredClone(this.employeeList);
    list.splice(
      this.employeeList.findIndex((e) => e.id === this.employee.id),
      1
    );

    list.map((item) => {
      if (item.parentId === this.employee.id) {
        item.parentId = this.employee.parentId;
      }
    });

    this.employeeDetailsService.set('employeeList', list);
    this.store.dispatch(initEmployeeList({ employeeList: list }));
    this.onClose.emit();
  }
}
