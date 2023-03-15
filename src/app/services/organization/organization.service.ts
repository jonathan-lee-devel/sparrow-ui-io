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
  /**
   * Organization data key used to store and access the organization data in local storage.
   * @private used only within the organization service.
   */
  private static readonly ORGANIZATION_DATA_KEY: string = 'organizationInfo';

  /**
   * Event emitter for current organization DTO.
   */
  @Output() currentOrganizationDtoEventEmitter: EventEmitter<OrganizationDto> = new EventEmitter<OrganizationDto>();

  /**
   * Standard constructor.
   * @param {HttpClient} httpClient used to access organization API
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Method which returns the current organization DTO.
   * @return {OrganizationDto | null} organization data or null if current organization is not set
   */
  public currentOrganization(): OrganizationDto | null {
    const organizationData = localStorage.getItem(OrganizationService.ORGANIZATION_DATA_KEY);
    if (organizationData) {
      const organization = JSON.parse(organizationData);
      this.currentOrganizationDtoEventEmitter.next(organization);
      return organization;
    }
    return null;
  }

  /**
   * Observable to subscribe to the current organization DTO.
   * @return {Observable<OrganizationDto>} current organization observable
   */
  public getCurrentOrganization(): Observable<OrganizationDto> {
    return this.currentOrganizationDtoEventEmitter;
  }

  /**
   * Method to update the current organization to the parameter passed.
   * @param {OrganizationDto} organization organization to set current organization DTO to
   */
  public setCurrentOrganization(organization: OrganizationDto) {
    localStorage.setItem(OrganizationService.ORGANIZATION_DATA_KEY, JSON.stringify(organization));
    this.currentOrganizationDtoEventEmitter.next(organization);
  }

  /**
   * Method to remove the current organization DTO from local storage.
   */
  public deleteOrganizationInfo() {
    localStorage.removeItem(OrganizationService.ORGANIZATION_DATA_KEY);
  }

  /**
   * API call to get organizations where the current user is involved.
   * @return {Observable<OrganizationDto[]>} organizations where the current user is involved
   */
  getOrganizationWhereInvolved(): Observable<OrganizationDto[]> {
    return this.httpClient
        .get<OrganizationDto[]>(`${environment.MAIN_API_URL}/organizations/where-involved`);
  }

  /**
   * API call to create an organization with the given name.
   * @param {string} organizationName name of the organization to create
   * @return {Observable<OrganizationDto>} organization which has been created if successful
   */
  createOrganization(organizationName: string): Observable<OrganizationDto> {
    const body = {
      name: organizationName,
    };
    return this.httpClient
        .post<OrganizationDto>(`${environment.MAIN_API_URL}/organizations`, body);
  }

  /**
   * API call to get an organization DTO by ID.
   * @param {string} organizationId ID of the organization to obtain
   * @return {Observable<OrganizationDto>} observable of obtained organization data
   */
  getOrganizationById(organizationId: string): Observable<OrganizationDto> {
    return this.httpClient.get<OrganizationDto>(`${environment.MAIN_API_URL}/organizations/${organizationId}`);
  }

  /**
   * API call to get an organization snippet DTO by ID.
   * @param {string} organizationId ID of the organization snippet to contain
   * @return {Observable<OrganizationSnippetDto>} observable of obtained organization snippet data
   */
  getOrganizationSnippetById(organizationId: string): Observable<OrganizationSnippetDto> {
    return this.httpClient.get<OrganizationSnippetDto>(`${environment.MAIN_API_URL}/organizations/${organizationId}/snippet`);
  }

  /**
   * API call to invite a given user by e-mail to an organization.
   * @param {string} organizationId ID of the organization to invite the user to
   * @param {string} emailToInvite e-mail of the user to invite to the organization
   * @return {Observable<OrganizationMembershipStatusDto>} observable of the organization membership status DTO returned
   */
  inviteToOrganization(organizationId: string, emailToInvite: string): Observable<OrganizationMembershipStatusDto> {
    return this.httpClient.post<OrganizationMembershipStatusDto>(`${environment.MAIN_API_URL}/organizations/invite-to-join/${organizationId}`, {emailToInvite});
  }

  /**
   * API call to get organization invitation DTO by token value.
   * @param {string} invitationTokenValue token value of the organization invitation to obtain
   * @return {Observable<OrganizationInvitationDto>} observable of the organization invitation DTO returned
   */
  getOrganizationInvitation(invitationTokenValue: string): Observable<OrganizationInvitationDto> {
    return this.httpClient.get<OrganizationInvitationDto>(`${environment.MAIN_API_URL}/organizations/invitations/tokenValue/${invitationTokenValue}`);
  }

  /**
   * API call to accept an organization invitation by token value.
   * @param {string} invitationTokenValue token value of the organization invitation to accept
   * @return {Observable<OrganizationInvitationDto>} observable of the organization invitation DTO returned
   */
  acceptOrganizationInvitation(invitationTokenValue: string): Observable<OrganizationInvitationDto> {
    return this.httpClient.put<OrganizationInvitationDto>(`${environment.MAIN_API_URL}/organizations/invitations/accept/tokenValue/${invitationTokenValue}`, {});
  }

  /**
   * API call to allow for an admin of an organization to also join as a member.
   * @param {string} organizationId ID of the organization to join as a member
   * @return {Observable<OrganizationMembershipStatusDto>} observable of the organization membership status returned
   */
  joinOrganizationAsMember(organizationId: string): Observable<OrganizationMembershipStatusDto> {
    return this.httpClient.put<OrganizationMembershipStatusDto>(`${environment.MAIN_API_URL}/organizations/update-admin-join-as-member/${organizationId}`, {});
  }
}
