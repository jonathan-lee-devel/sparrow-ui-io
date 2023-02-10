import {Component, OnInit} from '@angular/core';
import {DEFAULT_ORGANIZATION, OrganizationDto} from '../../../../dtos/OrganizationDto';
import {OrganizationService} from '../../../../services/organization/organization.service';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css'],
})
export class OrganizationsComponent implements OnInit {
  currentOrganization: OrganizationDto = DEFAULT_ORGANIZATION;

  constructor(private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.organizationService.getCurrentOrganization()
        .subscribe((organization) => {
          this.currentOrganization = organization;
        });
    const currentOrganization = this.organizationService.currentOrganization();
    if (currentOrganization) {
      this.currentOrganization = currentOrganization;
    }
  }
}
