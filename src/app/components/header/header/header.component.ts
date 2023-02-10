import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {DEFAULT_ORGANIZATION, OrganizationDto} from '../../../dtos/OrganizationDto';
import {OrganizationService} from '../../../services/organization/organization.service';
import {NotificationDto} from '../../../dtos/notifications/NotificationDto';
import {NotificationService} from '../../../services/notification/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
/**
 * Header component.
 */
export class HeaderComponent implements OnInit {
  isMobile: boolean = false;
  isLoggedIn: boolean = false;
  loggedInUsername: string = 'John Doe';
  availableOrganizations: OrganizationDto[] = [];
  currentOrganization: OrganizationDto = DEFAULT_ORGANIZATION;
  notifications: NotificationDto[] = [];

  /**
   * Standard constructor.
   * @param {AuthService} authService used to authenticate
   * @param {OrganizationService} organizationService used to switch organizations
   * @param {NotificationService} notificationService used to access notifications
   */
  constructor(private authService: AuthService,
              private organizationService: OrganizationService,
              private notificationService: NotificationService) {
    this.authService.getIsLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.organizationService.getCurrentOrganization().subscribe((currentOrganization) => {
      this.currentOrganization = currentOrganization;
    });
    this.organizationService.getOrganizationWhereInvolved()
        .subscribe((organizations) => {
          this.availableOrganizations = organizations;
        });
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.loggedInUsername = userInfo.username;
    }
  }

  /**
   * Init method.
   */
  ngOnInit() {
    if (window.screen.width <= 500) {
      this.isMobile = true;
    }
    this.isLoggedIn = this.authService.isAuthenticated();
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.loggedInUsername = userInfo.username;
      this.notificationService.getNotifications()
          .subscribe((notifications) => {
            this.notifications = notifications;
          });
      this.notificationService.unacknowledgedNotifications.subscribe(
          (unacknowledgedNotifications) => {
            this.notifications = unacknowledgedNotifications;
          },
      );
    }
    const currentOrganization = this.organizationService.currentOrganization();
    if (currentOrganization) {
      this.currentOrganization = currentOrganization;
    }
  }

  /**
   * Method to perform logout functionality.
   */
  doLogout() {
    this.authService.logout(true);
  }

  updateCurrentOrganization(organization: OrganizationDto) {
    this.organizationService.setCurrentOrganization(organization);
  }
}
