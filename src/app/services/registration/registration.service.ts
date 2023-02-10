import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RegistrationDto} from '../../dtos/users/RegistrationDto';
import {RegistrationStatusDto} from '../../dtos/users/RegistrationStatusDto';

@Injectable({
  providedIn: 'root',
})
/**
 * Registration service.
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class RegistrationService {
  /**
   * Standard constructor.
   * @param {HttpClient} httpClient used to access registration API
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Used to register via the API.
   * @param {RegistrationDto} registrationDto registration details to be passed to the API
   * @return {Observable<RegistrationStatusDto>} observable from API request
   */
  register(registrationDto: RegistrationDto): Observable<RegistrationStatusDto> {
    return this.httpClient.post<RegistrationStatusDto>('/api/register', registrationDto);
  }

  /**
   * Used to confirm registration via the API.
   * @param {string} tokenValue token value used to confirm registration
   * @return {Observable<RegistrationStatusDto>} observable from API request
   */
  confirmRegistration(tokenValue: string): Observable<RegistrationStatusDto> {
    return this.httpClient.post<RegistrationStatusDto>('/api/register/confirm', {
      tokenValue,
    });
  }
}
