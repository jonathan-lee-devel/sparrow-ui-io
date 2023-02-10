import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrganizationDto} from '../../dtos/OrganizationDto';

@Injectable({
  providedIn: 'root',
})
/**
 * Organization service.
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class OrganizationService {
  private static readonly ORGANIZATION_DATA_KEY: string = 'organizationInfo';

  @Output() currentOrganizationDtoEventEmitter: EventEmitter<OrganizationDto> = new EventEmitter<OrganizationDto>();

  constructor(private httpClient: HttpClient) {
  }

  public currentOrganization(): OrganizationDto | null {
    const organizationData = localStorage.getItem(OrganizationService.ORGANIZATION_DATA_KEY);
    if (organizationData) {
      const organization = JSON.parse(organizationData);
      this.currentOrganizationDtoEventEmitter.next(organization);
      return organization;
    }
    return null;
  }

  public getCurrentOrganization(): Observable<OrganizationDto> {
    return this.currentOrganizationDtoEventEmitter;
  }

  public setCurrentOrganization(organization: OrganizationDto) {
    localStorage.setItem(OrganizationService.ORGANIZATION_DATA_KEY, JSON.stringify(organization));
    this.currentOrganizationDtoEventEmitter.next(organization);
  }

  public deleteOrganizationInfo() {
    localStorage.removeItem(OrganizationService.ORGANIZATION_DATA_KEY);
  }

  getOrganizationWhereInvolved(): Observable<OrganizationDto[]> {
    return this.httpClient
        .get<OrganizationDto[]>('/api/organizations/where-involved');
  }

  createOrganization(organizationName: string) {
    const body = {
      name: organizationName,
    };
    return this.httpClient
        .post<OrganizationDto>('/api/organizations', body);
  }

  getOrganizationById(organizationId: string): Observable<OrganizationDto> {
    return this.httpClient.get<OrganizationDto>(`/api/organizations/${organizationId}`);
  }
}
