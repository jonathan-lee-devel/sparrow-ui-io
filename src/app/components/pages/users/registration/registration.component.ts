import {Component} from '@angular/core';
import {RegistrationService} from '../../../../services/registration/registration.service';
import {ModalService} from '../../../../services/modal/modal.service';
import {Router} from '@angular/router';
import {RegistrationDto} from '../../../../dtos/users/RegistrationDto';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
/**
 * Registration component.
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class RegistrationComponent {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  confirmPassword: string = '';
  acceptTermsAndConditions: boolean = false;

  /**
   * Standard constructor.
   * @param {RegistrationService} registrationService used to register using API
   * @param {ModalService} modalService used to display registration status messages
   * @param {Router} router used to navigate accordingly
   */
  constructor(private registrationService: RegistrationService,
              private modalService: ModalService,
              private router: Router) {
  }

  /**
   * Register user information with API according to form fields.
   */
  doRegister() {
    const registrationDto: RegistrationDto = {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      password: this.password,
      confirmPassword: this.confirmPassword,
      acceptTermsAndConditions: this.acceptTermsAndConditions,
    };

    this.registrationService
        .register(registrationDto)
        .subscribe((response) => {
          if (response.status === 'AWAITING_EMAIL_VERIFICATION') {
            this.modalService.showModal('Registration Status', 'Awaiting e-mail verification');
            this.router.navigate(['/login']).then((_) => {
            });
          }
        });
  }
}
