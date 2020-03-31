import { CalendarComponent } from './pages/calendar/calendar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';





@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
