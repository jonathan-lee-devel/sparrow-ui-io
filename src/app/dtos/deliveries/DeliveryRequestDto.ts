export interface DeliveryRequestDto {
  organizationId: string;
  title: string;
  details: string;
  assignedDriverEmail: string;
  isDelivered: boolean;
}
