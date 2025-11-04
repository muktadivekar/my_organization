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
import { Designation, Employee } from '../models/employee.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppState } from '../models/app.state';
import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsService } from '../services/employeeDetails.service';
import { LoggerService } from '../services/logger.service';
import { Store } from '@ngrx/store';
import { initEmployeeList } from '../actions/employees.actions';
import { selectAllItems } from '../selectors/emploees.selectors';

@Component({
  selector: 'app-add-new-employee-modal',
  imports: [ClarityModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-new-employee-modal.component.html',
  styleUrl: './add-new-employee-modal.component.css',
})
export class AddNewEmployeeModalComponent implements OnInit {
  employeesCount = 0;
  employeeList: Employee[] = [];
  reporteeForm!: FormGroup;
  public DesignationEnum: { [key: string]: string } = Designation;
  @Input() superviser!: Employee;
  @Input() isEdit: boolean = false;
  @Input() openAddNewModal = false;
  @Output() onClose: EventEmitter<any> = new EventEmitter();

  employeeDetailsService = inject(EmployeeDetailsService);

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    let employeeList = this.store.select(selectAllItems);
    employeeList.subscribe((array) => {
      this.employeesCount = array.length;
      this.employeeList = structuredClone(array);

      this.reporteeForm = new FormGroup({
        name: new FormControl(this.isEdit ? this.superviser.name : '', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
        designation: new FormControl(
          this.isEdit ? this.superviser.designation : '',
          Validators.required
        ),
        email: new FormControl(this.isEdit ? this.superviser.email : '', [
          Validators.required,
          Validators.email,
        ]),
        phone: new FormControl(this.isEdit ? this.superviser.phone : '', [
          Validators.required,
          PhoneNumberValidator(),
        ]),
      });
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

  getDesignationsList() {
    return Object.keys(Designation);
  }

  onSubmit() {
    let updatedArray = [];
    if (this.isEdit) {
      updatedArray = this.employeeList;
      const index = updatedArray.findIndex((e) => e.id === this.superviser.id);
      updatedArray[index].name = this.reporteeForm.get('name')!.value ?? '';
      updatedArray[index].designation =
        this.reporteeForm.get('designation')!.value ?? '';
      updatedArray[index].email = this.reporteeForm.get('email')!.value ?? '';
      updatedArray[index].phone = this.reporteeForm.get('phone')!.value ?? '';
    } else {
      const newEmployeeData = {
        id: this.employeesCount + 1,
        parentId: this.superviser.id,
        name: this.reporteeForm.get('name')!.value ?? '',
        designation: this.reporteeForm.get('designation')!.value ?? '',
        email: this.reporteeForm.get('email')!.value ?? '',
        phone: this.reporteeForm.get('phone')!.value ?? '',
      };
      updatedArray = [...this.employeeList, newEmployeeData];
    }

    this.employeeDetailsService.set('employeeList', updatedArray);
    this.store.dispatch(initEmployeeList({ employeeList: updatedArray }));
    this.onClose.emit();
  }
}

export function PhoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneRegExp =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const validNum = phoneRegExp.test(control.value);
    return validNum ? null : { invalidphonenumber: { value: control.value } };
  };
}
