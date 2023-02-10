import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PasswordResetStatusDto} from '../../dtos/users/PasswordResetStatusDto';
import {ModalService} from '../modal/modal.service';

@Injectable({
  providedIn: 'root',
})
/**
 * Password service used to request password resets and confirm password resets.
 *
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class PasswordService {
  /**
   * Standard constructor.
   * @param {HttpClient} httpClient used to access password reset functionality via API
   * @param {ModalService} modalService used to display password reset status to the user
   */
  constructor(private httpClient: HttpClient,
              private modalService: ModalService) {
  }

  /**
   * Requests to reset password for user with email provided via the API.
   * @param {string} email email of user for which password is to be reset
   */
  requestResetPassword(email: string) {
    const body = {
      email,
    };
    this.httpClient.post<PasswordResetStatusDto>('/api/password/reset', body)
        .subscribe((response) => {
          if (response.status === 'AWAITING_EMAIL_VERIFICATION') {
            this.modalService.showModal('Password Reset Status', 'Awaiting e-mail verification, please check your inbox');
          } else {
            this.modalService.showModal('Request Error', 'The server responded with an unexpected response status');
          }
        });
  }
}
