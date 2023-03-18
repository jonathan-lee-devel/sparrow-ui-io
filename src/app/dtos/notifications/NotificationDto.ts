export interface NotificationDto {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
  type: string;
  isAcknowledged: boolean;
}

export const DEFAULT_NOTIFICATION: NotificationDto = {
  id: '-1',
  title: 'Loading...',
  content: 'Loading...',
  timestamp: new Date(),
  type: 'INFO',
  isAcknowledged: false,
};
