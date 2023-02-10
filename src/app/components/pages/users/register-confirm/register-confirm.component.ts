import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RegistrationService} from '../../../../services/registration/registration.service';
import {ModalService} from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-register-confirm',
  templateUrl: './register-confirm.component.html',
  styleUrls: ['./register-confirm.component.css'],
})
/**
 * Register confirm component.
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class RegisterConfirmComponent {
  /**
   * Standard constructor.
   * @param {ActivatedRoute} activatedRoute used to obtain path variables
   * @param {RegistrationService} registrationService used to confirm registration via API
   * @param {ModalService} modalService used to display registration status
   * @param {Router} router used to navigate accordingly
   */
  constructor(private activatedRoute: ActivatedRoute,
              private registrationService: RegistrationService,
              private modalService: ModalService,
              private router: Router) {
  }

  /**
   * Method used to obtain path variable and attempt to confirm registration via API.
   */
  doConfirmRegister() {
    this.activatedRoute.params.subscribe((params) => {
      const tokenValue = params['tokenValue'];
      this.registrationService
          .confirmRegistration(tokenValue)
          .subscribe((response) => {
            if (response.status === 'SUCCESS') {
              this.modalService.showModal('Registration Status', 'Registration successful you may now log in');
              this.router.navigate(['/login']).then((_) => {
              });
            }
          });
    });
  }
}
