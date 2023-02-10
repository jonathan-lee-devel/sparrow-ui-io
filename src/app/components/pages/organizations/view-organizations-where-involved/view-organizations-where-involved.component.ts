import {Component, OnInit} from '@angular/core';
import {OrganizationDto} from '../../../../dtos/OrganizationDto';
import {OrganizationService} from '../../../../services/organization/organization.service';
import {AuthService} from '../../../../services/auth/auth.service';
import {ModalService} from '../../../../services/modal/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-organizations-where-involved',
  templateUrl: './view-organizations-where-involved.component.html',
  styleUrls: ['./view-organizations-where-involved.component.css'],
})
/**
 * View organizations where involved component.
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class ViewOrganizationsWhereInvolvedComponent implements OnInit {
  organizations: OrganizationDto[] = [];

  /**
   * Standard constructor.
   * @param {OrganizationService} organizationService used to access API
   * @param {AuthService} authService used to obtain user info
   * @param {ModalService} modalService used to display messages to user
   * @param {Router} router used to navigate accordingly
   */
  constructor(private organizationService: OrganizationService,
              private authService: AuthService,
              private modalService: ModalService,
              private router: Router) {
  }

  /**
   * Init method.
   */
  ngOnInit() {
    this.organizationService
        .getOrganizationWhereInvolved()
        .subscribe((organizations) => {
          this.organizations = organizations;
        });
  }

  /**
   * Method to determine if the currently logged-in user is an administrator of the given organization.
   * @param {OrganizationDto} organization given organization
   * @return {boolean} indicating whether currently logged-in user is administrator
   */
  isAdmin(organization: OrganizationDto): boolean {
    const loginInfo = this.authService.getUserInfo();
    if (loginInfo) {
      return organization.administratorEmails.includes(loginInfo.username);
    }
    return false;
  }

  /**
   * Method to select the given organization as the current organization.
   * @param {OrganizationDto} organization to be selected
   */
  selectOrganization(organization: OrganizationDto) {
    this.organizationService.setCurrentOrganization(organization);
    this.modalService.showModal('Organization Selection', `Selected ${organization.name} as the current organization`);
    this.router.navigate(['home']).then((_) => {
    });
  }
}
