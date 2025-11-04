import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClarityModule } from '@clr/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrgEmployeeTableComponent } from './org-employee-table/org-employee-table.component';
import { OrgHierarchyGraphViewComponent } from './org-hierarchy-graph-view/org-hierarchy-graph-view.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
