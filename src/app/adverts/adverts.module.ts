import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAdvertsComponent } from './all-adverts/all-adverts.component';
import { RouterModule } from '@angular/router';
import { UserAdvertsComponent } from './user-adverts/user-adverts.component';
import { HttpClientModule } from '@angular/common/http';
import { EditAdvertComponent } from './edit-advert/edit-advert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NotAuthenticatedGuard } from '../shared/not-authenticated.guard';
import { CanEditGuard } from '../shared/can-edit.guard';
import { UnsavedGuard } from '../shared/unsaved.guard';
import { PageNotFoundComponent } from '../shared/page-not-found.component';
import { CheckoutAdvertComponent } from './checkout-advert/checkout-advert.component';

const routes = [
  { path: 'all', component: AllAdvertsComponent },
  { path: 'myadverts', component: UserAdvertsComponent, canActivate: [NotAuthenticatedGuard] },
  { path: 'edit/:id/:owner', component: EditAdvertComponent, canActivate: [CanEditGuard, NotAuthenticatedGuard], canDeactivate: [UnsavedGuard] },
  { path: 'checkout/:id', component: CheckoutAdvertComponent, canActivate: [NotAuthenticatedGuard] },
  { path: '', redirectTo: 'all', pathMatch: 'full' } ,
  { path: '**', component: PageNotFoundComponent }
]

@NgModule({
  declarations: [AllAdvertsComponent, UserAdvertsComponent, EditAdvertComponent, CheckoutAdvertComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})

export class AdvertsModule { }
