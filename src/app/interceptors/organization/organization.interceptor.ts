import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrganizationService} from '../../services/organization/organization.service';
import {OrganizationDto} from '../../dtos/OrganizationDto';

@Injectable()
/**
 * Organization interceptor intended to include request header containing current organization ID.
 */
export class OrganizationInterceptor implements HttpInterceptor {
  private currentOrganization: OrganizationDto = {
    id: '-1',
    name: 'No Organization Selected',
    memberEmails: [],
    administratorEmails: [],
  };

  /**
   * Standard constructor.
   * @param {OrganizationService} organizationService used to get current organization
   */
  constructor(private organizationService: OrganizationService) {
    this.organizationService.getCurrentOrganization()
        .subscribe((organization) => {
          this.currentOrganization = organization;
        });
  }

  /**
   * Main intercept method.
   * @param {HttpRequest} request to be intercepted
   * @param {HttpHandler} next to be handled
   * @return {Observable} interception
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentOrganization = this.organizationService.currentOrganization();
    if (currentOrganization) {
      this.currentOrganization = currentOrganization;
    }
    request = request.clone({
      withCredentials: true,
      setHeaders: {
        organizationId: this.currentOrganization.id,
      },
    });

    return next.handle(request);
  }
}
