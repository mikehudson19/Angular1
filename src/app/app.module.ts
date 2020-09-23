import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { AdvertsModule } from './adverts/adverts.module';
import { FakeBackEnd } from './services/fake-backend'; 
import { HttpClientModule } from '@angular/common/http';
import { PageNotFoundComponent } from './shared/page-not-found.component';

const routes = [
  { path: 'app', component: AppComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AuthenticateModule,
    AdvertsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    InMemoryWebApiModule.forRoot(FakeBackEnd)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }