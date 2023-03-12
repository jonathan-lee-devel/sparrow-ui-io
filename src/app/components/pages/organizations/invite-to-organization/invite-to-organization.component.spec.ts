import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteToOrganizationComponent } from './invite-to-organization.component';

describe('InviteToOrganizationComponent', () => {
  let component: InviteToOrganizationComponent;
  let fixture: ComponentFixture<InviteToOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteToOrganizationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InviteToOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
