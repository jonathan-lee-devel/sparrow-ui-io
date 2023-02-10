import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {PasswordResetStatusDto} from '../../../../dtos/users/PasswordResetStatusDto';
import {ModalService} from '../../../../services/modal/modal.service';

@Component({
  selector: 'app-password-reset-confirm',
  templateUrl: './password-reset-confirm.component.html',
  styleUrls: ['./password-reset-confirm.component.css'],
})
/**
 * Password reset confirm component.
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>s
 */
export class PasswordResetConfirmComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  passwordResetTokenValue: string = '';

  /**
   * Standard constructor.
   * @param {ActivatedRoute} route used to access path variables
   * @param {HttpClient} httpClient used to access API
   * @param {ModalService} modalService used to display API responses
   * @param {Router} router used to navigate accordingly
   */
  constructor(private route: ActivatedRoute,
              private httpClient: HttpClient,
              private modalService: ModalService,
              private router: Router) {
  }

  /**
   * Init method.
   */
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.passwordResetTokenValue = params['passwordResetTokenValue'];
    });
  }

  /**
   * Method which actually performs the confirmation of password reset via the API.
   */
  doConfirmPasswordReset() {
    const body = {
      tokenValue: this.passwordResetTokenValue,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };
    this.httpClient.post<PasswordResetStatusDto>('/api/password/reset/confirm', body)
        .subscribe((response) => {
          if (response.status === 'SUCCESS') {
            this.modalService.showModal('Password Reset', 'Password reset successfully, you may now login');
            this.router.navigate(['login']).then((_) => {
            });
          } else if (response.status === 'EMAIL_VERIFICATION_EXPIRED') {
            this.modalService.showModal('Password Reset', 'E-mail verification has expired');
          } else if (response.status === 'INVALID_TOKEN') {
            this.modalService.showModal('Password Reset', 'Invalid password reset token provided');
          } else {
            this.modalService.showModal('Password Reset Failure', 'Something went wrong and we were unable to reset your password');
          }
        });
  }
}
