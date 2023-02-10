import {Component, OnInit} from '@angular/core';
import {DEFAULT_ORGANIZATION, OrganizationDto} from '../../../../dtos/OrganizationDto';
import {OrganizationService} from '../../../../services/organization/organization.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-view-organization',
  templateUrl: './view-organization.component.html',
  styleUrls: ['./view-organization.component.css'],
})
export class ViewOrganizationComponent implements OnInit {
  organization: OrganizationDto = DEFAULT_ORGANIZATION;

  constructor(private route: ActivatedRoute,
              private organizationService: OrganizationService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const organizationId = params['organizationId'];
      this.organizationService.getOrganizationById(organizationId).subscribe((organization) => {
        this.organization = organization;
      });
    });
  }
}
