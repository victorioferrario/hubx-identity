import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ApiService } from "./services/app.api.service";
import { AuthService } from "./services/app.auth.service";

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    ApiService,
    AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
