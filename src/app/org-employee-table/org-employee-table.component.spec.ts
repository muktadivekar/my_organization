import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgEmployeeTableComponent } from './org-employee-table.component';

describe('OrgEmployeeTableComponent', () => {
  let component: OrgEmployeeTableComponent;
  let fixture: ComponentFixture<OrgEmployeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgEmployeeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgEmployeeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
