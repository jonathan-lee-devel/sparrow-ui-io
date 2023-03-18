import {Component, OnInit} from '@angular/core';
import {DEFAULT_NOTIFICATION, NotificationDto} from '../../../../dtos/notifications/NotificationDto';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../../../services/notification/notification.service';

@Component({
  selector: 'app-view-notification',
  templateUrl: './view-notification.component.html',
  styleUrls: ['./view-notification.component.css'],
})
export class ViewNotificationComponent implements OnInit {
  notification: NotificationDto = DEFAULT_NOTIFICATION;

  constructor(private route: ActivatedRoute,
    private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const notificationId = params['notificationId'];
      this.notificationService.getNotificationById(notificationId)
          .subscribe((notification) => {
            this.notification = notification;
          });
    });
  }

  /**
   * Method which acknowledges the given notification via the notifications API.
   * @param {NotificationDto} notification notification to acknowledge
   */
  acknowledgeNotification(notification: NotificationDto) {
    this.notificationService.acknowledgeNotification(notification)
        .subscribe((returnedNotification) => {
          if (returnedNotification.isAcknowledged) {
            notification.isAcknowledged = returnedNotification.isAcknowledged;
            this.notificationService.getNotifications()
                .subscribe((notifications) => {
                  this.notificationService.updateNotifications(notifications);
                });
          }
        });
  }
}
