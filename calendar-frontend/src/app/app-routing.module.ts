

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { CalendarComponent } from './pages/calendar/calendar.component';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'calendar', component: CalendarComponent},
  { path: '**', redirectTo: 'calendar' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
