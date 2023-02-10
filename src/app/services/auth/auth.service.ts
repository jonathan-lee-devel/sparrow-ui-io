import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ModalService} from '../modal/modal.service';
import {OrganizationService} from '../organization/organization.service';
import {LoginDto} from '../../dtos/users/LoginDto';
import {DEFAULT_ORGANIZATION} from '../../dtos/OrganizationDto';

@Injectable({
  providedIn: 'root',
})
/**
 * Auth service used to authenticate users.
 * @author jonathanlee <jonathan.lee.devel@gmail.com>
 */
export class AuthService {
  private static readonly USER_DATA_KEY: string = 'userInfo';

  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() userInfo: EventEmitter<LoginDto> = new EventEmitter<LoginDto>();

  /**
   * Standard constructor
   * @param {HttpClient} httpClient used to access backend API
   * @param {Router} router used to route based on login success/failure
   * @param {ModalService} modalService used to display login/logout success/failure
   * @param {OrganizationService} organizationService used to clear organization info on logout
   */
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private organizationService: OrganizationService,
  ) {
  }

  /**
   * Used to determine if a user is authenticated.
   * @return {Observable} boolean indicating if user is authenticated
   */
  public isAuthenticated(): boolean {
    const userData = localStorage.getItem(AuthService.USER_DATA_KEY);
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      const successfulAuthentication =
        parsedUserData.loginStatus === 'SUCCESS';
      this.isLoggedIn.next(successfulAuthentication);
      this.userInfo.next(parsedUserData);
      return successfulAuthentication;
    }
    return false;
  }

  /**
   * Allow for subscription to isLoggedIn event emitter.
   * @return {Observable} observable for isLoggedIn event emitter
   */
  public getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn;
  }

  /**
   * Returns parsed user info as LoginDto, null if undefined.
   * @return {LoginDto | null} user info as LoginDto or null if undefined
   */
  public getUserInfo(): LoginDto | null {
    const userInfo = localStorage.getItem(AuthService.USER_DATA_KEY);
    return (userInfo) ? JSON.parse(userInfo) : null;
  }

  /**
   * Used to set user info in local storage.
   * @param {LoginDto} userInfo data to be stored
   */
  public setUserInfo(userInfo: LoginDto) {
    localStorage.setItem(AuthService.USER_DATA_KEY, JSON.stringify(userInfo));
  }

  /**
   * Deletes user authentication info.
   */
  public deleteUserInfo() {
    localStorage.removeItem(AuthService.USER_DATA_KEY);
  }

  /**
   * Used to validate user credentials and create user session.
   * @param {string} username to be authenticated
   * @param {string} password to be authenticated
   */
  public validate(username: string, password: string) {
    const body = {
      username,
      password,
    };

    this.httpClient
        .post<LoginDto>(`/api/auth/login`, body)
        .subscribe((response) => {
          if (response.loginStatus == 'SUCCESS') {
            this.setUserInfo(response);
            this.isLoggedIn.next(true);
            this.router.navigate(['/home']).then((_) => {
            });
          }
        });
  }

  /**
   * Used to log out and end user session.
   * @param {boolean} showMessage flag indicating whether success message should be shown
   */
  logout(showMessage: boolean) {
    this.deleteUserInfo();
    this.organizationService.deleteOrganizationInfo();
    this.isLoggedIn.next(false);
    this.organizationService.setCurrentOrganization(DEFAULT_ORGANIZATION);
    this.router.navigate(['/login']).then((_) => {
    });
    if (showMessage) {
      this.modalService.showModal('Authentication Status', 'User has successfully logged out');
    }
  }
}
