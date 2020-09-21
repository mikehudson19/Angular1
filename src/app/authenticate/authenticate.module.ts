import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticatedGuard } from './authenticate.guard';

const routes = [
  {
    path: 'registration',
    canActivate: [AuthenticatedGuard],
    component: RegistrationComponent,
  },
  {
    path: 'login',
    canActivate: [AuthenticatedGuard],
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class AuthenticateModule {}
