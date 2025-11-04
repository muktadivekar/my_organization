import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppState } from '../models/app.state';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { EmployeeDetailsService } from '../services/employeeDetails.service';
import { LoggerService } from '../services/logger.service';
import { Store } from '@ngrx/store';
import { initEmployeeList } from '../actions/employees.actions';
import { selectAllItems } from '../selectors/emploees.selectors';

@Component({
  selector: 'app-change-manager-modal',
  imports: [ClarityModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './change-manager-modal.component.html',
  styleUrl: './change-manager-modal.component.css',
})
export class ChangeManagerModalComponent implements OnInit {
  @Input() employee!: Employee;
  @Input() openUpdateSuperviserModal = false;

  @Output() onClose: EventEmitter<any> = new EventEmitter();

  employeeDetailsService = inject(EmployeeDetailsService);
  employeeList: Employee[] = [];
  inputForm = new FormGroup({
    managerId: new FormControl(0, [Validators.required]),
  });

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    let employeeList = this.store.select(selectAllItems);
    employeeList.subscribe((array) => {
      this.employeeList = structuredClone(array);
    });
  }

  close() {
    this.onClose.emit();
  }
  onKeyPress(event: { keyCode: number }) {
    if (event.keyCode === 13) {
      this.onSubmit();
    }
  }

  onSubmit() {
    const newManagerId: number = parseInt(
      this.inputForm.get('managerId')!.value! as unknown as string
    );
    LoggerService.debug(
      `Changing employee ${this.employee.id} manager to ${newManagerId}`
    );

    let updatedArray = structuredClone(this.employeeList);
    const index = updatedArray.findIndex((e) => e.id === this.employee.id);
    updatedArray[index].parentId = newManagerId;
    this.employeeDetailsService.set('employeeList', updatedArray);
    this.store.dispatch(initEmployeeList({ employeeList: updatedArray }));
    this.onClose.emit();
  }
}
