import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeliveryDto} from '../../dtos/deliveries/DeliveryDto';
import {Observable} from 'rxjs';
import {DeliveryRequestDto} from '../../dtos/deliveries/DeliveryRequestDto';

@Injectable({
  providedIn: 'root',
})
/**
 * Delivery service.
 *
 * @author Jonathan Lee <jonathan.lee.devel@gmail.com>
 */
export class DeliveryService {
  /**
   * Standard constructor
   * @param {HttpClient} httpClient used to access delivery API
   */
  constructor(private httpClient: HttpClient) {
  }

  /**
   * Method to obtain all deliveries for a given organization.
   * @return {Observable<DeliveryDto[]>} deliveries observable
   */
  public getDeliveries(): Observable<DeliveryDto[]> {
    return this.httpClient
        .get<DeliveryDto[]>('/api/deliveries/assigned');
  }

  /**
   * Method to create a delivery.
   * @param {DeliveryRequestDto} deliveryRequestDto request DTO
   * @return {Observable<DeliveryDto>} delivery observable
   */
  createDelivery(deliveryRequestDto: DeliveryRequestDto): Observable<DeliveryDto> {
    return this.httpClient
        .post<DeliveryDto>('/api/deliveries', deliveryRequestDto);
  }

  /**
   * Method to mark delivery as delivered.
   * @param {string} deliveryId ID of delivery to be marked as delivered
   * @return {Observable<DeliveryDto>} delivery response from API
   */
  markDeliveryAsDelivered(deliveryId: string): Observable<DeliveryDto> {
    return this.httpClient
        .put<DeliveryDto>(`/api/deliveries/${deliveryId}/mark-delivered`, {});
  }

  /**
   * Method to mark delivery as undelivered.
   * @param {string} deliveryId ID of delivery to be marked as undelivered
   * @return {Observable<DeliveryDto>} delivery response from API
   */
  markDeliveryAsUndelivered(deliveryId: string): Observable<DeliveryDto> {
    return this.httpClient
        .put<DeliveryDto>(`/api/deliveries/${deliveryId}/mark-undelivered`, {});
  }
}
