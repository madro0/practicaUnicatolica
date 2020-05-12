
import { isEmpty } from 'rxjs/operators';
import { EventModel } from './../../models/event.model';
import { Component, OnInit, Input } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ApiService} from './../../services/api.service';
import { HelperConvert } from './../../helpers/helperConverting';
//import NgbActiveModal para poder controlar 
//la ventana modal de events donde contiene este componente.
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../services/auth.service';

import Swal from 'sweetalert2'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-modal',
  templateUrl: './event-modal.component.html',
  styleUrls: ['./event-modal.component.css']
})
export class EventModalComponent implements OnInit {
//componente hijo su padre es events
@Input() iddHijo:number;//para pasarle el id del evento al modal.

helper = new HelperConvert();
//creatOrEdit:boolean=true;
event: EventModel = new EventModel(); //las variables de event estan el este modelo.
//para mostrar o no el btn de subir archivos
show=true;

//bandera para determinar si envio el msm de crear o actualizar
createOrRead=true;

closeImg() {
  this.show = false;
  setTimeout(() => this.show = true, 5000);
}

constructor(private apiService:ApiService, public activeModal: NgbActiveModal, private auth:AuthService) { 
}
  
  ngOnInit(): void {

    this.event.id= this.iddHijo
    if(this.iddHijo!=null){
      this.createOrRead=false;
      
      this.apiService.getEventById(this.iddHijo).subscribe((resp: EventModel)=>{
        this.event= resp;
        this.event.fecha_inicio= this.helper.dateConvert(this.helper.stringToDateConvert(this.event.fecha_inicio));
        this.event.fecha_fin= this.helper.dateConvert(this.helper.stringToDateConvert(this.event.fecha_fin));
      }, err=>{
        if(err.error.message=="Expired JWT Token"){
          console.log('saliendo...')
          this.auth.logout();
        }
      });
    }
  }
  guardar(form: NgForm){
    if(form.invalid ){
      console.log('formulario invalido');
      return;
    }
    Swal.fire({
      title:'Espere',
      text: 'Guardado Información',
      allowOutsideClick: false,
      icon: 'info',
    });
    Swal.showLoading();
  
    let peticion: Observable<any>;

    //si hay id actualizo
    if(this.event.id){
      //console.log(form);
      //console.log(this.event);
      peticion=this.apiService.updateEventById(this.event);
      this.createOrRead=false;
    }else{
      //si no creo
      peticion=this.apiService.crearEvento(this.event);
      this.createOrRead=true;
    }
    //aquí unimos el actualizar y el crear.
    let mensaje=''
    if(this.createOrRead==true){
      mensaje='Se creó correctamente';
    }else{
      mensaje='Se actualizó correctamente';
    }
    peticion.subscribe(res=>{
      console.log(res);
      Swal.fire({
        title: this.event.nombre,
        text: mensaje,
        icon: 'success',
      })
    }, 
    err=>{
      if(err.error.message=="Expired JWT Token"){
          console.log('saliendo...')
          this.auth.logout();
      }
    });

    this.activeModal.close();
  }

  //cerra la ventana modal.
  close(){
    this.activeModal.close();
  }

  
}
