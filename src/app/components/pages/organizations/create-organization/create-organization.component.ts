import {Component} from '@angular/core';
import {OrganizationService} from '../../../../services/organization/organization.service';
import {ModalService} from '../../../../services/modal/modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-organization',
  templateUrl: './create-organization.component.html',
  styleUrls: ['./create-organization.component.css'],
})
export class CreateOrganizationComponent {
  name: string = '';

  constructor(private organizationService: OrganizationService,
              private modalService: ModalService,
              private router: Router) {
  }

  doCreateOrganization() {
    this.organizationService.createOrganization(this.name).subscribe((organization) => {
      if (organization.name === this.name) {
        this.modalService.showModal('Organization Creation', 'Organization succesfully created');
        this.router.navigate([`/organizations/view/${organization.id}`]).then((_) => {
        });
      }
    });
  }
}
