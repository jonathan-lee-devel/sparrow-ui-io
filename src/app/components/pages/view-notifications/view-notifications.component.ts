import {Component, OnInit} from '@angular/core';
import {NotificationDto} from '../../../dtos/notifications/NotificationDto';
import {NotificationService} from '../../../services/notification/notification.service';

@Component({
  selector: 'app-view-notifications',
  templateUrl: './view-notifications.component.html',
  styleUrls: ['./view-notifications.component.css'],
})
/**
 * View notifications component.
 *
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class ViewNotificationsComponent implements OnInit {
  notifications: NotificationDto[] = [];

  /**
   * Standard constructor.
   * @param {NotificationService} notificationService used to get notifications for currently logged-in userß
   */
  constructor(private notificationService: NotificationService) {
  }

  /**
   * Standard Init method.
   */
  ngOnInit() {
    this.notificationService.getAllNotifications()
        .subscribe((notifications) => {
          this.notifications = notifications;
        });
  }

  /**
   * Method which acknowledges the given notification via the notifications API.
   * @param {NotificationDto} notification notification to acknowledge
   */
  acknowledgeNotification(notification: NotificationDto) {
    this.notificationService.acknowledgeNotification(notification)
        .subscribe((returnedNotification) => {
          if (returnedNotification.acknowledged) {
            notification.acknowledged = returnedNotification.acknowledged;
            this.notificationService.updateNotifications(this.notifications);
          }
        });
  }
}
