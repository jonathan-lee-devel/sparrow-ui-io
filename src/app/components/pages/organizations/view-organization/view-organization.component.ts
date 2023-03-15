import {Component, OnInit} from '@angular/core';
import {DEFAULT_ORGANIZATION, OrganizationDto} from '../../../../dtos/organizations/OrganizationDto';
import {OrganizationService} from '../../../../services/organization/organization.service';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../../../services/auth/auth.service';
import {ModalService} from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-view-organization',
  templateUrl: './view-organization.component.html',
  styleUrls: ['./view-organization.component.css'],
})
/**
 * View organization component.
 */
export class ViewOrganizationComponent implements OnInit {
  organization: OrganizationDto = DEFAULT_ORGANIZATION;

  /**
   * Standard constructor.
   * @param {ActivatedRoute} route used to get organization ID path variable
   * @param {OrganizationService} organizationService used to access organization API
   * @param {AuthService} authService used to access user info
   * @param {ModalService} modalService used to display status message to user
   */
  constructor(private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private authService: AuthService,
    private modalService: ModalService) {
  }

  /**
   * Standard ngOnInit method which loads organization data based on path variable.
   */
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const organizationId = params['organizationId'];
      this.organizationService.getOrganizationById(organizationId).subscribe((organization) => {
        this.organization = organization;
      });
    });
  }

  /**
   * Allows for the requesting user to request to join organization as member (if admin).
   */
  joinOrganizationAsMember() {
    this.organizationService.joinOrganizationAsMember(this.organization.id)
        .subscribe((organizationMembershipStatus) => {
          if (organizationMembershipStatus.status === 'SUCCESS') {
            this.modalService.showModal('Organization Membership Status', 'Successfully joined organization as member');
          }
        });
  }

  /**
   * Method used to determine if the current user is an admin and not a member.
   * @return {boolean} true/false representing whether the current user is an admin and not a member
   */
  currentUserIsAdminAndNotMember(): boolean {
    const userInfo = this.authService.currentUserInfo();
    return (this.organization.administratorEmails.includes(userInfo.email) &&
      !this.organization.memberEmails.includes(userInfo.email));
  }
}
