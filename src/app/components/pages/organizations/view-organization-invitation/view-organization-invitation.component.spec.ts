import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganizationInvitationComponent } from './view-organization-invitation.component';

describe('ViewOrganizationInvitationComponent', () => {
  let component: ViewOrganizationInvitationComponent;
  let fixture: ComponentFixture<ViewOrganizationInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewOrganizationInvitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOrganizationInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
