import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {OrganizationDto} from '../../dtos/organizations/OrganizationDto';
import {environment} from '../../../environments/environment';
import {OrganizationSnippetDto} from '../../dtos/organizations/OrganizationSnippetDto';
import {OrganizationMembershipStatusDto} from '../../dtos/organizations/OrganizationMembershipStatusDto';
import {OrganizationInvitationDto} from '../../dtos/organizations/OrganizationInvitationDto';

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
        .get<OrganizationDto[]>(`${environment.MAIN_API_URL}/organizations/where-involved`);
  }

  createOrganization(organizationName: string) {
    const body = {
      name: organizationName,
    };
    return this.httpClient
        .post<OrganizationDto>(`${environment.MAIN_API_URL}/organizations`, body);
  }

  getOrganizationById(organizationId: string): Observable<OrganizationDto> {
    return this.httpClient.get<OrganizationDto>(`${environment.MAIN_API_URL}/organizations/${organizationId}`);
  }

  getOrganizationSnippetById(organizationId: string): Observable<OrganizationSnippetDto> {
    return this.httpClient.get<OrganizationSnippetDto>(`${environment.MAIN_API_URL}/organizations/${organizationId}/snippet`);
  }

  inviteToOrganization(organizationId: string, emailToInvite: string): Observable<OrganizationMembershipStatusDto> {
    return this.httpClient.post<OrganizationMembershipStatusDto>(`${environment.MAIN_API_URL}/organizations/invite-to-join/${organizationId}`, {emailToInvite});
  }

  getOrganizationInvitation(invitationTokenValue: string): Observable<OrganizationInvitationDto> {
    return this.httpClient.get<OrganizationInvitationDto>(`${environment.MAIN_API_URL}/organizations/invitations/tokenValue/${invitationTokenValue}`);
  }

  acceptOrganizationInvitation(invitationTokenValue: string): Observable<OrganizationInvitationDto> {
    return this.httpClient.put<OrganizationInvitationDto>(`${environment.MAIN_API_URL}/organizations/invitations/accept/tokenValue/${invitationTokenValue}`, {});
  }
}
