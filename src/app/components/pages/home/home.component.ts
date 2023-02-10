import {Component, OnInit} from '@angular/core';
import {DEFAULT_ORGANIZATION, OrganizationDto} from '../../../dtos/OrganizationDto';
import {OrganizationService} from '../../../services/organization/organization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
/**
 * Home component.
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class HomeComponent implements OnInit {
  currentOrganization: OrganizationDto = DEFAULT_ORGANIZATION;

  constructor(private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.organizationService.getCurrentOrganization().subscribe(
        (currentOrganization) => {
          this.currentOrganization = currentOrganization;
        },
    );
    const currentOrganization = this.organizationService.currentOrganization();
    if (currentOrganization) {
      this.currentOrganization = currentOrganization;
    }
  }
}
