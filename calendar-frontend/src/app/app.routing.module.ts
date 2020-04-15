
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
//de aqui se importan los componentes creados a mano
import { CalendarComponent } from './pages/calendar/calendar.component';
import { LoginComponent } from './pages/login/login.component';
const routes: Routes= [
    {path: 'calendar', component: CalendarComponent},
    {path: 'login', component: LoginComponent},
    {path: '**', redirectTo: 'calendar'}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],

    exports: [ RouterModule ]
})

export class AppRoutingModule {}