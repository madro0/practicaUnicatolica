import { EventModel } from './../../models/event.model';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  
    
})
export class EventsComponent implements OnInit {
  //componente padre su 
  closeResult: string;
  events : EventModel []=[];
  idEventP:number;
  readAndEdit:boolean=true;

  constructor(private modalService: NgbModal, private api: ApiService) {
    this.getEvents();
   }
  
  ngOnInit(): void {
   
  }
  openLg(content) {
    this.readAndEdit=true;
    this.idEventP=null;
    this.modalService.open(content, { size: 'lg' });
  }
  closeModal() {
    //this.modalService.close();
  }
  openEditLg(content, id:number) {
    this.readAndEdit=false;
    this.idEventP= id;
    this.modalService.open(content, { size: 'lg' });
  }
  getEvents(){
    this.api.getAllEventosMod().subscribe(resp=> {
      //console.log(resp);
      this.events = resp;
    });
  }
  deleteEvent(event:EventModel, index){
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea eliminar el evento?${event.nombre}`,
      showConfirmButton: true,
      showCancelButton: true,
      icon: 'question'
    }).then(resp=>{
      if(resp.value){
        //this.events.splice(index,1);

        this.getEvents();
        this.api.deleteEventById(event.id).subscribe();
      }
    });
  }
  otro(){
    console.log("actualizar lista");
    this.events= null;
  }

}
