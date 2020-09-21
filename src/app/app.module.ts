import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InMemoryDbService, InMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AuthenticateModule } from './authenticate/authenticate.module';
import { AdvertsModule } from './adverts/adverts.module';
import { FakeBackEnd } from './services/fake-backend'; 
import { HttpClientModule } from '@angular/common/http';

const routes = [
  { path: 'app', component: AppComponent }
]

@NgModule({
  declarations: [
    AppComponent
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