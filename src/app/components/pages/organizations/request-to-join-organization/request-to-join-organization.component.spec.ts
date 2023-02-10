import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestToJoinOrganizationComponent } from './request-to-join-organization.component';

describe('RequestToJoinOrganizationComponent', () => {
  let component: RequestToJoinOrganizationComponent;
  let fixture: ComponentFixture<RequestToJoinOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestToJoinOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestToJoinOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
