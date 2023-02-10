import {Component} from '@angular/core';
import {PasswordService} from '../../../../services/password/password.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css'],
})
/**
 * Password-reset component.
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class PasswordResetComponent {
  email: string = '';

  constructor(private passwordService: PasswordService) {
  }

  doRequestPasswordReset() {
    this.passwordService.requestResetPassword(this.email);
  }
}
