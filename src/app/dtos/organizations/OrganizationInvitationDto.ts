export interface OrganizationInvitationDto {
  organizationId: string;
  requestingUserEmail: string;
  isAccepted: boolean;
  value: string;
  expiryDate: Date;
  emailToInvite: string;
}

export const DEFAULT_ORGANIZATION_INVITATION: OrganizationInvitationDto = {
  organizationId: '-1',
  requestingUserEmail: 'user@mail.com',
  isAccepted: false,
  value: '-1',
  expiryDate: new Date(),
  emailToInvite: 'user@mail.com',
};
