import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationDto} from '../../dtos/notifications/NotificationDto';

@Injectable({
  providedIn: 'root',
})
/**
 * Notification service.
 *
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class NotificationService {
  unacknowledgedNotifications: EventEmitter<NotificationDto[]> = new EventEmitter<NotificationDto[]>();

  /**
   * Standard constructor.
   * @param {HttpClient} httpClient used to access notification API
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Method to update unacknowledged notifications.
   * @param {NotificationDto[]} unacknowledgedNotifications new unacknowledged notifications
   */
  updateNotifications(unacknowledgedNotifications: NotificationDto[]): void {
    this.unacknowledgedNotifications.next(unacknowledgedNotifications);
  }

  /**
   * Method to get notifications for currently logged-in user.
   * @return {Observable<NotificationDto>} notifications for currently logged-in user
   */
  getNotifications(): Observable<NotificationDto[]> {
    return this.httpClient.get<NotificationDto[]>('/api/notifications');
  }

  /**
   * Method to get all notifications for currently logged-in user.
   * @return {Observable<NotificationDto>} all notifications for currently logged-in user
   */
  getAllNotifications(): Observable<NotificationDto[]> {
    return this.httpClient.get<NotificationDto[]>('/api/notifications/all');
  }

  /**
   * Method to acknowledge a given notification.
   * @param {NotificationDto} notification notification to acknowledge
   * @return {Observable<NotificationDto>} response from notifications API
   */
  acknowledgeNotification(notification: NotificationDto): Observable<NotificationDto> {
    return this.httpClient.put<NotificationDto>(`/api/notifications/acknowledge/${notification.id}`, {});
  }
}
