
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID} from '@angular/core';

import { AppComponent } from './app.component';
//importar modulo de enrutamiento. 
import { AppRoutingModule } from './app.routing.module';
//importacion de comoponentes creados a mano.
import { CalendarComponent } from './pages/calendar/calendar.component';
//Importaciones hechas a mano
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClickOutsideModule } from 'ng-click-outside';
import { registerLocaleData } from '@angular/common';



//import localize para cambiar el idioma a español.
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

//import serives
import { ApiService} from './services/api.service';
//import http
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { EventsComponent } from './pages/events/events.component';
import { EventComponent } from './pages/event/event.component';
import { EventModalComponent } from './pages/event-modal/event-modal.component';







@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    EventsComponent,
    EventComponent,
    EventModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    ClickOutsideModule
  ],
  entryComponents:[
    EventComponent
  ],
  providers: [
    ApiService,
    {
      provide: LOCALE_ID,
      useValue: 'es'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
