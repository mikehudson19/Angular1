import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllAdvertsComponent } from './all-adverts/all-adverts.component';
import { RouterModule } from '@angular/router';
import { UserAdvertsComponent } from './user-adverts/user-adverts.component';
import { AuthenticatedGuard } from '../authenticate/authenticate.guard';

const routes = [
  { path: '', component: AllAdvertsComponent} ,
  { path: 'myadverts', component: UserAdvertsComponent }
]

@NgModule({
  declarations: [AllAdvertsComponent, UserAdvertsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})

export class AdvertsModule { }
