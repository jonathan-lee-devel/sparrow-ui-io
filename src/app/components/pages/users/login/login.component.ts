import {Component} from '@angular/core';
import {AuthService} from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
/**
 * Login component.
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class LoginComponent {
  email: string = '';

  password: string = '';

  /**
   * Standard constructor.
   * @param {AuthService} authService used to validate user credentials
   */
  constructor(private authService: AuthService) {
  }

  /**
   * Action which invokes the login validation functionality of the auth service.
   */
  doLogin() {
    this.authService.validate(this.email, this.password);
  }
}
