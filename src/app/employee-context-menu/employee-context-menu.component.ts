import { Component, Input } from '@angular/core';

import { AddNewEmployeeModalComponent } from '../add-new-employee-modal/add-new-employee-modal.component';
import { ChangeManagerModalComponent } from '../change-manager-modal/change-manager-modal.component';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { DeleteEmployeeModalComponent } from '../delete-employee-modal/delete-employee-modal.component';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-context-menu',
  imports: [
    ClarityModule,
    CommonModule,
    AddNewEmployeeModalComponent,
    DeleteEmployeeModalComponent,
    ChangeManagerModalComponent,
  ],
  templateUrl: './employee-context-menu.component.html',
  styleUrl: './employee-context-menu.component.css',
})
export class EmployeeContextMenuComponent {
  @Input() employee!: Employee;
  @Input() iconShape: string = 'ellipsis-vertical';
  openAddNewModal = false;
  isEdit = false;
  openDeleteModal = false;
  openUpdateSuperviserModal = false;

  openEditModal() {
    this.isEdit = true;
    this.openAddNewModal = true;
  }

  closeAddEditModal() {
    this.isEdit = false;
    this.openAddNewModal = false;
  }
}
