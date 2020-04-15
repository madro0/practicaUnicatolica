
import { ApiService } from './../../services/api.service';


import {NgbDate, NgbCalendar, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { ClickOutsideModule } from 'ng-click-outside';


import { 
  Component, 
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit } from '@angular/core';
  import {
    startOfDay,
    endOfDay,
    subDays,
    addDays,
    endOfMonth,
    isSameDay,
    isSameMonth,
    addHours,
  } from 'date-fns';
  import { Subject } from 'rxjs';
  import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
  import {
    CalendarEvent,
    CalendarEventAction,
    CalendarEventTimesChangedEvent,
    CalendarView,
  } from 'angular-calendar';
  
  const colors: any = {
    red: {
      primary: '#ad2121',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#e3bc08',
      secondary: '#FDF1BA',
    },
  };

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;
  view: CalendarView = CalendarView.Month;

  //creamos el arry de tipo 'CalendarView' para poderlo llenar con los datos traidos del api
  //esta vueltaaa

  disabled= false;
  aux=true;
  
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate=null;
  toDate: NgbDate | null = null;
  descripcion :string;
 


  
  CalendarView = CalendarView;

  viewDate: Date = new Date();

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  
  actions:CalendarEventAction[] =[
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);},
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Deleted', event);},
    },
  ];

  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [
    {
      id:0,
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: colors.yellow,
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: colors.blue,
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: colors.yellow,
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];
  
  activeDayIsOpen: boolean = true;
  constructor(private api: ApiService, private modal: NgbModal,   calendar: NgbCalendar) {
    //aqui llamo los eventos para que se cargen.  
    this.loadEvents();
  }

  //esta vuelta es para hacer lo del calendario
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  onClickedOutside() {
    //cerrar
    if(this.aux==true && this.disabled==true){
      this.disabled= false;
      this.aux=false;
    }
    this.aux=true;
  }
  onClickedOpen() {
    //abrir
    this.aux=false;
    this.disabled= true; 
  }
  //cierro

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({event, newStart,newEnd,}: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
   
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    var dateIn: Date = event.start;
    var dateFin: Date = event.end;

    this.descripcion="Este evento no tiene descripcion."
      if(event.id!= null){
        this.api.getDesciption(event.id.toString()).subscribe((daticos: any)=>{
          if( daticos!= null){
           this.descripcion= daticos.descripcion;
          }
        });
      }
    this.fromDate = new NgbDate(dateIn.getFullYear(), dateIn.getMonth()+1 , dateIn.getDay());
    this.toDate = new NgbDate(dateFin.getFullYear(), dateFin.getMonth()+1, dateFin.getDay());
    //new NgbDate( dateFin.getFullYear(), dateFin.getMonth() , 27);
    this.disabled=false;
    //abrir ventana modal
 
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { scrollable: true } );
  }
  

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
  ngOnInit() {
    //this.prueba();
  }

  loadEvents(){
    this.api.getAllEventos().subscribe((daticos: any)=>{
      //console.log(daticos);
      for(var i = 0; i<daticos.length; i++){
        this.events.push(
          {
            id : daticos[i].id, 
            title: daticos[i].nombre,
            start: startOfDay(new Date(daticos[i].fecha_inicio.date)),
            end: endOfDay(new Date(daticos[i].fecha_fin.date)),
            color: colors.black,
            actions: this.actions,
            allDay: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true,
                }
        );
      }

      for(var i = 0; i<this.events.length; i ++){
        console.log(this.events[i]);
    }
    });
    
  }

  

}
