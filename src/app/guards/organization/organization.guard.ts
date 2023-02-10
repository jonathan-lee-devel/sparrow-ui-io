import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {OrganizationDto} from '../../dtos/OrganizationDto';
import {OrganizationService} from '../../services/organization/organization.service';
import {ModalService} from '../../services/modal/modal.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Organization Guard.
 *
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class OrganizationGuard implements CanActivate {
  private currentOrganization: OrganizationDto = {
    id: '-1',
    name: 'No Organization Selected',
    memberEmails: [],
    administratorEmails: [],
  };

  /**
   * Standard constructor.
   * @param {OrganizationService} organizationService used to obtain current organization
   * @param {ModalService} modalService used to display messages to the user
   * @param {Router} router used to navigate accordingly
   */
  constructor(private organizationService: OrganizationService,
              private modalService: ModalService,
              private router: Router) {
    this.organizationService.getCurrentOrganization()
        .subscribe((organization) => {
          this.currentOrganization = organization;
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
    const currentOrganization = this.organizationService.currentOrganization();
    if (currentOrganization) {
      this.currentOrganization = currentOrganization;
    }

    if (currentOrganization == null || currentOrganization?.id === '-1') {
      this.modalService.showModal('Request Error', 'You must select an organization to make requests');
      this.router.navigate(['organizations/involvements']).then((_) => {
      });
      return false;
    }
    return true;
  }
}
