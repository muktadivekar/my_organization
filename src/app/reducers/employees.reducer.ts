import {
  addNewEmployee,
  deleteEmployee,
  initEmployeeList,
  updateEmployeeDetails,
} from '../actions/employees.actions';
import { createReducer, on } from '@ngrx/store';

import { AppState } from '../models/app.state';
import { Employee } from '../models/employee.model';

export const initialState: AppState = {
  employeeList: [],
};

export const employeeReducer = createReducer(
  initialState,
  on(initEmployeeList, (state, { employeeList }) => ({
    ...state,
    employeeList,
  })),
  on(addNewEmployee, (state, { data }) => ({
    ...state,
    items: [...state.employeeList, data],
  })),
  on(updateEmployeeDetails, (state, { data }) => ({
    ...state,
    items: state.employeeList.map((i) => (i.id === data.id ? data : i)),
  })),
  on(deleteEmployee, (state, { id }) => ({
    ...state,
    items: state.employeeList.filter((i) => i.id !== id),
  }))
);
