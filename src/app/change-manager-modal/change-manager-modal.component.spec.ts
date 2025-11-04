import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeManagerModalComponent } from './change-manager-modal.component';

describe('ChangeManagerModalComponent', () => {
  let component: ChangeManagerModalComponent;
  let fixture: ComponentFixture<ChangeManagerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeManagerModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
