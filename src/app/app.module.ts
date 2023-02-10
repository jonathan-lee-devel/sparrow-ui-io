import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './components/app/app.component';
import {RouterLink, RouterModule, RouterOutlet} from '@angular/router';
import {HeaderComponent} from './components/header/header/header.component';
import {appRoutes} from './app.routes';
import {FormsModule} from '@angular/forms';
import {ModalComponent} from './components/modal/modal/modal.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {ErrorInterceptor} from './interceptors/error/error.interceptor';
import {ErrorForbiddenComponent} from './components/pages/errors/error-forbidden/error-forbidden.component';
import {ErrorNotFoundComponent} from './components/pages/errors/error-not-found/error-not-found.component';
import {RegistrationComponent} from './components/pages/users/registration/registration.component';
import {LoginComponent} from './components/pages/users/login/login.component';
import {HomeComponent} from './components/pages/home/home.component';
import {ProfileComponent} from './components/pages/users/profile/profile.component';
import {PasswordResetComponent} from './components/pages/users/password-reset/password-reset.component';
import {RegisterConfirmComponent} from './components/pages/users/register-confirm/register-confirm.component';
import {
  ViewOrganizationComponent,
} from './components/pages/organizations/view-organization/view-organization.component';
import {ViewDeliveriesComponent} from './components/pages/deliveries/view-deliveries/view-deliveries.component';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {AdminPanelComponent} from './components/pages/admin-panel/admin-panel.component';
import {ViewSuppliersComponent} from './components/pages/suppliers/view-suppliers/view-suppliers.component';
import {ViewOrdersComponent} from './components/pages/orders/view-orders/view-orders.component';
import {
  PasswordResetConfirmComponent,
} from './components/pages/users/password-reset-confirm/password-reset-confirm.component';
import {OrganizationInterceptor} from './interceptors/organization/organization.interceptor';
import {
  ViewOrganizationsWhereInvolvedComponent,
} from './components/pages/organizations/view-organizations-where-involved/view-organizations-where-involved.component';
import { RequestToJoinOrganizationComponent } from './components/pages/organizations/request-to-join-organization/request-to-join-organization.component';
import { CreateOrganizationComponent } from './components/pages/organizations/create-organization/create-organization.component';
import { OrganizationsComponent } from './components/pages/organizations/organizations/organizations.component';
import { CreateDeliveryComponent } from './components/pages/deliveries/create-delivery/create-delivery.component';
import { ViewNotificationsComponent } from './components/pages/view-notifications/view-notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ModalComponent,
    ErrorForbiddenComponent,
    ErrorNotFoundComponent,
    PasswordResetComponent,
    RegisterConfirmComponent,
    ViewOrganizationComponent,
    ViewDeliveriesComponent,
    LandingPageComponent,
    AdminPanelComponent,
    ViewSuppliersComponent,
    ViewOrdersComponent,
    PasswordResetConfirmComponent,
    ViewOrganizationsWhereInvolvedComponent,
    RequestToJoinOrganizationComponent,
    CreateOrganizationComponent,
    OrganizationsComponent,
    CreateDeliveryComponent,
    ViewNotificationsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientXsrfModule,
    RouterModule.forRoot(appRoutes),
    RouterOutlet,
    RouterLink,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OrganizationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
/**
 * Default AppModule
 */
export class AppModule {
}
