import { Router } from '@angular/router';

import { EventModel } from './../../models/event.model';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { id } from 'date-fns/locale';
import Swal from 'sweetalert2';

//
import { EventModalComponent } from './../event-modal/event-modal.component';
import { AuthService } from 'src/app/services/auth.service';


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
  cargando =false;

  constructor(private modalService: NgbModal, private api: ApiService, private auth:AuthService, private router:Router) {
    this.getEvents();
   }
  
  ngOnInit(): void {
    
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
      this.cargando=true;
    }, err=>{
      
      if(err.error.message=="Expired JWT Token"){
          console.log("saliendo...");
          //this.salir();
      }
    });
  }
  deleteEvent(event:EventModel, index){
    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro que desea eliminar el evento ${event.nombre}?`,
      showConfirmButton: true,
      showCancelButton: true,
      icon: 'question'
    }).then(resp=>{
      if(resp.value){
        this.events.splice(index,1);
        //this.getEvents();
        this.api.deleteEventById(event.id).subscribe( 
          
        );
      }
    });
  }
  openModal(id: number){
    this.api.getAllEventosMod().subscribe(resp=> {
      const modalRef= this.modalService.open(EventModalComponent);
          modalRef.componentInstance.iddHijo=id;
          modalRef.result.then((restul) =>{
            this.getEvents();
          });
    });
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
    //console.log("entramos a salir");
  }



}
