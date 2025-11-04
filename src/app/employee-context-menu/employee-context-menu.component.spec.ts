import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeContextMenuComponent } from './employee-context-menu.component';

describe('EmployeeContextMenuComponent', () => {
  let component: EmployeeContextMenuComponent;
  let fixture: ComponentFixture<EmployeeContextMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeContextMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
