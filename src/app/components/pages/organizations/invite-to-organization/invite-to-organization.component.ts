import {Component} from '@angular/core';
import {DEFAULT_ORGANIZATION} from '../../../../dtos/organizations/OrganizationDto';
import {ActivatedRoute} from '@angular/router';
import {OrganizationService} from '../../../../services/organization/organization.service';
import {OrganizationSnippetDto} from '../../../../dtos/organizations/OrganizationSnippetDto';
import {ModalService} from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-invite-to-organization',
  templateUrl: './invite-to-organization.component.html',
  styleUrls: ['./invite-to-organization.component.css'],
})
export class InviteToOrganizationComponent {
  organization: OrganizationSnippetDto = DEFAULT_ORGANIZATION;
  email: string = '';

  constructor(private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private modalService: ModalService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const organizationId = params['organizationId'];
      this.organizationService.getOrganizationSnippetById(organizationId).subscribe((organizationSnippet) => {
        this.organization = organizationSnippet;
      });
    });
  }

  doInviteToOrganization() {
    this.organizationService.inviteToOrganization(this.organization.id, this.email)
        .subscribe((membershipStatus) => {
          this.modalService.showModal('Invitation Status', `${membershipStatus.status}`);
        });
  }
}
