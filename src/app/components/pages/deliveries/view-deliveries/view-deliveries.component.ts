import {Component, OnInit} from '@angular/core';
import {DeliveryDto} from '../../../../dtos/deliveries/DeliveryDto';
import {ModalService} from '../../../../services/modal/modal.service';
import {DeliveryService} from '../../../../services/delivery/delivery.service';

@Component({
  selector: 'app-view-deliveries',
  templateUrl: './view-deliveries.component.html',
  styleUrls: ['./view-deliveries.component.css'],
})
/**
 * View deliveries component.
 */
export class ViewDeliveriesComponent implements OnInit {
  deliveries: DeliveryDto[] = [];

  /**
   * Standard constructor.
   * @param {DeliveryService} deliveryService used to mark deliveries as delivered/undelivered
   * @param {ModalService} modalService used to display messages to the user
   */
  constructor(private deliveryService: DeliveryService,
    private modalService: ModalService) {
  }

  /**
   * Standard ngOnInit method.
   */
  ngOnInit() {
    this.deliveryService.getDeliveries()
        .subscribe((deliveries) => {
          this.deliveries = deliveries;
        });
  }

  /**
   * Method to mark specified delivery as delivered or undelivered based on current state.
   * @param {string} deliveryId ID of the delivery to be marked as delivered/undelivered
   */
  markOrUnmarkDeliveryAsDelivered(deliveryId: string) {
    const deliveredSpan = document.getElementById(`span_${deliveryId}`);
    const markDeliveredButton = document.getElementById(`button_${deliveryId}`);
    if (deliveredSpan && markDeliveredButton) {
      if (deliveredSpan.style.visibility === 'hidden') {
        this.deliveryService.markDeliveryAsDelivered(deliveryId).subscribe((delivery) => {
          if (delivery.isDelivered) {
            deliveredSpan.style.visibility = 'visible';
            markDeliveredButton.innerHTML = 'Unmark Delivered';
          } else {
            this.modalService.showModal('Request Error', 'An unknown error has occurred, please refresh the page');
          }
        });
      } else {
        this.deliveryService.markDeliveryAsUndelivered(deliveryId).subscribe((delivery) => {
          if (!delivery.isDelivered) {
            deliveredSpan.style.visibility = 'hidden';
            markDeliveredButton.innerHTML = 'Mark Delivered';
          } else {
            this.modalService.showModal('Request Error', 'An unknown error has occurred, please refresh the page');
          }
        });
      }
    } else {
      this.modalService.showModal('Error', 'An unknown state error has occurred, please refresh the page');
    }
  }
}
