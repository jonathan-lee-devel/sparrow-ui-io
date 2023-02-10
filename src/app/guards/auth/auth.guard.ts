import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';
import {ModalService} from '../../services/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Auth Guard.
 *
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class AuthGuard implements CanActivate {
  private isLoggedIn: boolean = false;

  /**
   * Standard constructor.
   * @param {AuthService} authService used to determine if user is authenticated
   * @param {ModalService} modalService used to display modal message
   * @param {Router} router used to navigate accordingly
   */
  constructor(private authService: AuthService,
              private modalService: ModalService,
              private router: Router) {
    this.authService.getIsLoggedIn()
        .subscribe((isLoggedIn) => {
          this.isLoggedIn = isLoggedIn;
        });
  }

  /**
   * Standard canActivate method.
   * @param {ActivatedRouteSnapshot} route route
   * @param {RouterStateSnapshot} state state
   * @return {boolean} whether the request should be processed
   */
  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.modalService.showModal(
          'Authentication Error',
          'You must be logged in to access that resource',
      );
      this.authService.logout(false);
      return false;
    }
    return true;
  }
}
