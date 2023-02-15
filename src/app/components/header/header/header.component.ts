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
    this.authService.getUserInfo().subscribe((userInfo) => {
      this.loggedInUsername = userInfo.email;
      this.loggedInUsername = this.authService.currentUserInfo().email;
    });
    this.organizationService.getCurrentOrganization().subscribe((currentOrganization) => {
      this.currentOrganization = currentOrganization;
    });
  }

  /**
   * Init method.
   */
  ngOnInit() {
    if (window.screen.width <= 500) {
      this.isMobile = true;
    }
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn) {
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
    this.loggedInUsername = this.authService.currentUserInfo().email;
  }

  /**
   * Method to perform logout functionality.
   */
  doLogout() {
    this.authService.logout(true);
  }
}
