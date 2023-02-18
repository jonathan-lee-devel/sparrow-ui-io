import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {ModalService} from '../modal/modal.service';
import {OrganizationService} from '../organization/organization.service';
import {LoginDto} from '../../dtos/users/LoginDto';
import {DEFAULT_ORGANIZATION} from '../../dtos/OrganizationDto';
import {UserDto} from '../../dtos/users/UserDto';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
/**
 * Auth service used to authenticate users.
 * @author jonathanlee <jonathan.lee.devel@gmail.com>
 */
export class AuthService {
  private static readonly USER_DATA_KEY: string = 'userInfo';

  private static readonly DEFAULT_USER: UserDto = {
    email: 'anonymous@mail.com',
    firstName: 'Anonymous',
    lastName: 'User',
  };

  @Output() isLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() userInfo: EventEmitter<UserDto> = new EventEmitter<UserDto>();

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
      return successfulAuthentication;
    }
    return false;
  }

  /**
   * Allow for subscription to isLoggedIn event emitter.
   * @return {Observable<boolean>} observable for isLoggedIn event emitter
   */
  public getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn;
  }

  /**
   * Allow for subscription to userInfo event emitter.
   * @return {Observable<UserDto>} observable for userInfo event emitter
   */
  public getUserInfo(): Observable<UserDto> {
    return this.userInfo;
  }

  /**
   * Method to obtain current user info.
   * @return {UserDto} current user info
   */
  public currentUserInfo(): UserDto {
    const userData = localStorage.getItem(AuthService.USER_DATA_KEY);
    if (userData) {
      return JSON.parse(userData).user;
    } else {
      return AuthService.DEFAULT_USER;
    }
  }

  /**
   * Used to validate user credentials and create user session.
   * @param {string} username to be authenticated
   * @param {string} password to be authenticated
   */
  public validate(username: string, password: string): void {
    const body = {
      username,
      password,
    };

    this.httpClient
        .post<LoginDto>(`${environment.MAIN_API_URL}/auth/login`, body)
        .subscribe((response) => {
          if (response.loginStatus == 'SUCCESS') {
            this.setUserInfo(response);
            this.isLoggedIn.next(true);
            if (response.user) {
              this.userInfo.next(response.user);
            }
            this.router.navigate(['/home']).then((_) => {
            });
          }
        });
  }

  /**
   * Sets user info to a JSON-stringified version of parameter passed.
   * @param {LoginDto} userInfo user info to be set
   */
  setUserInfo(userInfo: LoginDto): void {
    localStorage.setItem(AuthService.USER_DATA_KEY, JSON.stringify(userInfo));
  }

  /**
   * Deletes user info from local storage.
   */
  deleteUserInfo(): void {
    localStorage.removeItem(AuthService.USER_DATA_KEY);
  }

  /**
   * Used to log out and end user session.
   * @param {boolean} showMessage flag indicating whether success message should be shown
   */
  logout(showMessage: boolean): void {
    this.httpClient.post<LoginDto>(`${environment.MAIN_API_URL}/auth/logout`, {})
        .subscribe((response) => {
          if (response.loginStatus !== 'SUCCESS') {
            console.log('Error during logout on the server-side');
          }
        });
    this.deleteUserInfo();
    this.organizationService.deleteOrganizationInfo();
    this.isLoggedIn.next(false);
    this.userInfo.next(AuthService.DEFAULT_USER);
    this.organizationService.setCurrentOrganization(DEFAULT_ORGANIZATION);
    this.router.navigate(['/login']).then((_) => {
    });
    if (showMessage) {
      this.modalService.showModal('Authentication Status', 'User has successfully logged out');
    }
  }
}
