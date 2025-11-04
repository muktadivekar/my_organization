import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AppState } from '../models/app.state';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { OrgChart } from 'd3-org-chart';
import { Store } from '@ngrx/store';
import { selectAllItems } from '../selectors/emploees.selectors';

@Component({
  selector: 'app-org-hierarchy-graph-view',
  imports: [],
  templateUrl: './org-hierarchy-graph-view.component.html',
  styleUrls: ['./org-hierarchy-graph-view.component.css'],
})
export class OrgHierarchyGraphViewComponent implements OnInit {
  employeeList$!: Observable<Employee[]>;

  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  constructor(private store: Store<AppState>) {}

  private chart: any;

  ngOnInit(): void {
    this.chart = new OrgChart();
    this.employeeList$ = this.store.select(selectAllItems);
    this.employeeList$.subscribe((array) => {
      console.log('Rendering graph:', array);
      // The passed object needs to be extensible.
      this.renderChart(JSON.parse(JSON.stringify(array)));
    });
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['data'] && this.chart) {
  //     this.renderChart();
  //   }
  // }

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
