import { createAction, props } from '@ngrx/store';

import { Employee } from '../models/employee.model';

export const initEmployeeList = createAction(
  '[Employee List] init list',
  props<{ employeeList: Employee[] }>()
);
export const deleteEmployee = createAction(
  '[Employee Component] Delete',
  props<{ id: number }>()
);
export const addNewEmployee = createAction(
  '[Employee Component] Add new',
  props<{ data: Employee }>()
);
export const updateEmployeeDetails = createAction(
  '[Employee Component] edit',
  props<{ data: Employee }>()
);
