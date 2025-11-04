import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../models/app.state';

export const selectEmployeeListState =
  createFeatureSelector<AppState>('employeeList');

export const selectAllItems = createSelector(
  selectEmployeeListState,
  (state) => state.employeeList
);
