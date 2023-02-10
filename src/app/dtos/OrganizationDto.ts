export interface OrganizationDto {
  id: string;
  name: string;
  memberEmails: string[];
  administratorEmails: string[];
}

export const DEFAULT_ORGANIZATION: OrganizationDto = {
  id: '-1',
  name: 'No Organization Selected',
  memberEmails: [],
  administratorEmails: [],
};
