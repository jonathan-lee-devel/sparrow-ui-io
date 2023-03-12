import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OrganizationService} from '../../../../services/organization/organization.service';
import {
  DEFAULT_ORGANIZATION_INVITATION,
  OrganizationInvitationDto,
} from '../../../../dtos/organizations/OrganizationInvitationDto';
import {OrganizationSnippetDto} from '../../../../dtos/organizations/OrganizationSnippetDto';
import {DEFAULT_ORGANIZATION} from '../../../../dtos/organizations/OrganizationDto';
import {ModalService} from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-view-organization-invitation',
  templateUrl: './view-organization-invitation.component.html',
  styleUrls: ['./view-organization-invitation.component.css'],
})
/**
 * View organization invitation component.
 */
export class ViewOrganizationInvitationComponent implements OnInit {
  organizationInvitation: OrganizationInvitationDto = DEFAULT_ORGANIZATION_INVITATION;
  organizationSnippet: OrganizationSnippetDto = DEFAULT_ORGANIZATION;

  /**
   * Standard constructor.
   * @param {ActivatedRoute} route used to obtain path parameters
   * @param {OrganizationService} organizationService used to obtain invitation data
   * @param {ModalService} modalService used to display messages to the user
   * @param {Router} router used to navigate accordingly
   */
  constructor(private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private modalService: ModalService,
    private router: Router) {
  }

  /**
   * Standard ngOnInit method.
   */
  ngOnInit() {
    this.route.params.subscribe((params) => {
      const invitationTokenValue = params['invitationTokenValue'];
      this.organizationService.getOrganizationInvitation(invitationTokenValue)
          .subscribe((organizationInvitation) => {
            this.organizationInvitation = organizationInvitation;
            this.organizationService.getOrganizationSnippetById(organizationInvitation.organizationId)
                .subscribe((organizationSnippet) => {
                  this.organizationSnippet = organizationSnippet;
                });
          });
    });
  }

  acceptInvitation() {
    this.organizationService.acceptOrganizationInvitation(this.organizationInvitation.value)
        .subscribe((organizationInvitation) => {
          this.organizationInvitation = organizationInvitation;
          if (organizationInvitation.isAccepted) {
            this.modalService.showModal('Organization Invitation', 'Successfully accepted organization invitation');
            this.router.navigate([`/organizations/view/${this.organizationSnippet.id}`]).then((_) => {
            });
          }
        });
  }
}
