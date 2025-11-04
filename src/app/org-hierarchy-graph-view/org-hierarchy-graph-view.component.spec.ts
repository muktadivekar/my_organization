import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgHierarchyGraphViewComponent } from './org-hierarchy-graph-view.component';

describe('OrgHierarchyGraphViewComponent', () => {
  let component: OrgHierarchyGraphViewComponent;
  let fixture: ComponentFixture<OrgHierarchyGraphViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgHierarchyGraphViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgHierarchyGraphViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
