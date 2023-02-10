import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganizationsWhereInvolvedComponent } from './view-organizations-where-involved.component';

describe('ViewOrganizationsWhereInvolvedComponent', () => {
  let component: ViewOrganizationsWhereInvolvedComponent;
  let fixture: ComponentFixture<ViewOrganizationsWhereInvolvedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrganizationsWhereInvolvedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrganizationsWhereInvolvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
