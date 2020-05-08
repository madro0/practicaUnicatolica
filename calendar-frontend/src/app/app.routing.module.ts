import { EventComponent } from './pages/event/event.component';
import { EventsComponent } from './pages/events/events.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
//de aqui se importan los componentes creados a mano
import { CalendarComponent } from './pages/calendar/calendar.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes= [
    {path: 'calendar', component: CalendarComponent},
    {path: 'login', component: LoginComponent},
    {path: 'events', component: EventsComponent, canActivate: [AuthGuard]},
    {path: 'event', component: EventComponent},
    {path: '**', redirectTo: 'calendar'}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],

    exports: [ RouterModule ]
})

export class AppRoutingModule {}