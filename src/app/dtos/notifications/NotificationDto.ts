export interface NotificationDto {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  type: string;
  acknowledged: boolean;
}
