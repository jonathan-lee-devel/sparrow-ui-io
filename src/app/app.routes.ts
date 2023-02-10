import {Routes} from '@angular/router';
import {HomeComponent} from './components/pages/home/home.component';
import {RegistrationComponent} from './components/pages/users/registration/registration.component';
import {LoginComponent} from './components/pages/users/login/login.component';
import {ProfileComponent} from './components/pages/users/profile/profile.component';
import {ErrorNotFoundComponent} from './components/pages/errors/error-not-found/error-not-found.component';
import {ErrorForbiddenComponent} from './components/pages/errors/error-forbidden/error-forbidden.component';
import {PasswordResetComponent} from './components/pages/users/password-reset/password-reset.component';
import {RegisterConfirmComponent} from './components/pages/users/register-confirm/register-confirm.component';
import {
  ViewOrganizationComponent,
} from './components/pages/organizations/view-organization/view-organization.component';
import {ViewDeliveriesComponent} from './components/pages/deliveries/view-deliveries/view-deliveries.component';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {AdminPanelComponent} from './components/pages/admin-panel/admin-panel.component';
import {ViewOrdersComponent} from './components/pages/orders/view-orders/view-orders.component';
import {ViewSuppliersComponent} from './components/pages/suppliers/view-suppliers/view-suppliers.component';
import {
  PasswordResetConfirmComponent,
} from './components/pages/users/password-reset-confirm/password-reset-confirm.component';
import {AuthGuard} from './guards/auth/auth.guard';
import {OrganizationGuard} from './guards/organization/organization.guard';
import {
  ViewOrganizationsWhereInvolvedComponent,
} from './components/pages/organizations/view-organizations-where-involved/view-organizations-where-involved.component';
import {
  RequestToJoinOrganizationComponent,
} from './components/pages/organizations/request-to-join-organization/request-to-join-organization.component';
import {
  CreateOrganizationComponent,
} from './components/pages/organizations/create-organization/create-organization.component';
import {OrganizationsComponent} from './components/pages/organizations/organizations/organizations.component';
import {CreateDeliveryComponent} from './components/pages/deliveries/create-delivery/create-delivery.component';
import {ViewNotificationsComponent} from './components/pages/view-notifications/view-notifications.component';

export const appRoutes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register/confirm/:tokenValue', component: RegisterConfirmComponent},
  {path: 'password/reset', component: PasswordResetComponent},
  {path: 'password/reset/confirm/:passwordResetTokenValue', component: PasswordResetConfirmComponent},
  {path: 'organizations', component: OrganizationsComponent, canActivate: [AuthGuard]},
  {path: 'organizations/involvements', component: ViewOrganizationsWhereInvolvedComponent, canActivate: [AuthGuard]},
  {path: 'organizations/view/:organizationId', component: ViewOrganizationComponent, canActivate: [AuthGuard]},
  {path: 'organizations/request-to-join', component: RequestToJoinOrganizationComponent, canActivate: [AuthGuard]},
  {path: 'organizations/create', component: CreateOrganizationComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: ViewOrdersComponent, canActivate: [AuthGuard]},
  {path: 'suppliers', component: ViewSuppliersComponent, canActivate: [AuthGuard]},
  {path: 'deliveries', component: ViewDeliveriesComponent, canActivate: [AuthGuard, OrganizationGuard]},
  {path: 'deliveries/create', component: CreateDeliveryComponent, canActivate: [AuthGuard, OrganizationGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard]},
  {path: 'notifications', component: ViewNotificationsComponent, canActivate: [AuthGuard]},
  {path: 'error/not-found', component: ErrorNotFoundComponent},
  {path: 'error/forbidden', component: ErrorForbiddenComponent},
];
