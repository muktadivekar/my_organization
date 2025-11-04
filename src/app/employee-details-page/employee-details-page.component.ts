import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
  signal,
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { AppState } from '../models/app.state';
import { ClarityModule } from '@clr/angular';
import { Employee } from '../models/employee.model';
import { EmployeeDetailsService } from '../services/employeeDetails.service';
import { LoggerService as Logger } from '../services/logger.service';
import { Observable } from 'rxjs';
import { OrgChart } from 'd3-org-chart';
import { Store } from '@ngrx/store';
import { initEmployeeList } from '../actions/employees.actions';
import { selectAllItems } from '../selectors/emploees.selectors';

@Component({
  selector: 'app-employee-details-page',
  imports: [ClarityModule],
  templateUrl: './employee-details-page.component.html',
  styleUrl: './employee-details-page.component.css',
})
export class EmployeeDetailsPageComponent implements OnInit {
  employeeId = signal(0);
  employeeList$!: Observable<Employee[]>;
  employeeDetailsService = inject(EmployeeDetailsService);

  private activatedRoute = inject(ActivatedRoute);

  @ViewChild('employeeTree', { static: true }) chartContainer!: ElementRef;

  constructor(private store: Store<AppState>) {
    this.activatedRoute.params.subscribe((params) => {
      this.employeeId.set(parseInt(params['id']));
    });
  }

  private chart: any;

  ngOnInit(): void {
    this.chart = new OrgChart();

    const list: Employee[] | null = this.employeeDetailsService.get(
      'employeeList',
      []
    );
    if (list !== null && list?.length > 0) {
      this.store.dispatch(initEmployeeList({ employeeList: list }));
    } else {
      Logger.debug('No data added yet');
    }
    this.employeeList$ = this.store.select(selectAllItems);
    this.employeeList$.subscribe((array) => {
      // The passed object needs to be extensible.
      let id: number | null = this.employeeId();

      if (id > 0) {
        let list: Employee[] = [];
        let map: { [key: number]: Employee } = {};
        array.forEach((a) => {
          map[a.id] = structuredClone(a);
        });

        while (id !== null) {
          list.push(structuredClone(map[id]));
          id = map[id].parentId;
        }
        this.renderChart(list);
      }
    });
  }
  private renderChart(array: Employee[]): void {
    this.chart
      .nodeWidth((node: { data: Employee }) => 300)
      .nodeHeight((node: { data: Employee }) => 150)
      .nodeContent((node: { data: Employee }) => {
        return `<div class="card employee-node-container">
          <div class="employee-card-header">
            <div class="employee-card-name">${node.data.name}</div>
            <button type="button" class="btn btn-icon btn-sm employee-card-settings" aria-label="settings" (click)=(this.handleShowMenuClick(${node}))>
              <cds-icon shape="cog" solid="true" style="fill:white"></cds-icon>
            </button>
          </div>
          <div class="employee-card-details">
            <cds-icon class="employee-card-photo" shape="user" solid="true" ></cds-icon>
            <div>
              <div class="employee-card-detail">${node.data.designation}</div>
              <div class="employee-card-detail">Email: ${node.data.email}</div>
              <div class="employee-card-detail">Phone: ${node.data.phone}</div>
            <div>
          <div>
        <div>`;
      })
      .container(this.chartContainer.nativeElement)
      .data(array)
      .render();
  }
}
