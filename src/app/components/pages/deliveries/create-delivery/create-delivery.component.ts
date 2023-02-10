import {Component, OnInit} from '@angular/core';
import {DeliveryService} from '../../../../services/delivery/delivery.service';
import {ModalService} from '../../../../services/modal/modal.service';
import {DeliveryRequestDto} from '../../../../dtos/deliveries/DeliveryRequestDto';
import {Router} from '@angular/router';
import {DEFAULT_ORGANIZATION, OrganizationDto} from '../../../../dtos/OrganizationDto';
import {OrganizationService} from '../../../../services/organization/organization.service';

@Component({
  selector: 'app-create-delivery',
  templateUrl: './create-delivery.component.html',
  styleUrls: ['./create-delivery.component.css'],
})
/**
 * Create delivery component.
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class CreateDeliveryComponent implements OnInit {
  title: string = '';
  details: string = '';
  assignedDriverEmail: string = '';
  isDelivered: boolean = false;
  organization: OrganizationDto = DEFAULT_ORGANIZATION;

  /**
   * Standard constructor
   * @param {OrganizationService} organizationService used to access organization API
   * @param {DeliveryService} deliveryService used to access delivery API
   * @param {ModalService} modalService used to display status message to user
   * @param {Router} router used to navigate accordingly
   */
  constructor(private organizationService: OrganizationService,
              private deliveryService: DeliveryService,
              private modalService: ModalService,
              private router: Router) {
  }

  /**
   * Init method.
   */
  ngOnInit() {
    this.organizationService.getCurrentOrganization()
        .subscribe((organization) => {
          this.organization = organization;
          console.log(JSON.stringify(organization));
        });
    const organization = this.organizationService.currentOrganization();
    if (organization) {
      this.organization = organization;
    }
  }

  /**
   * Method to create delivery on form submit.
   */
  doCreateDelivery() {
    const deliveryRequestDto: DeliveryRequestDto = {
      title: this.title,
      details: this.details,
      assignedDriverEmail: this.assignedDriverEmail,
      delivered: this.isDelivered,
    };
    this.deliveryService.createDelivery(deliveryRequestDto).subscribe((delivery) => {
      this.modalService.showModal('Delivery Creation', `Delivery with title ${delivery.title} successfully created`);
      this.router.navigate(['admin-panel']).then((_) => {
      });
    });
  }
}
