import { EventModel } from './../../models/event.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {ApiService} from './../../services/api.service';
import { HelperConvert } from './../../helpers/helperConverting';

import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
import { isEmpty } from 'rxjs/operators';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
  
})
export class EventComponent implements OnInit {
//componente hijo su padre es events
@Input() iddHijo:number;//para pasarle el id del evento al modal.
model: NgbDateStruct; //pa ra la ventana modal
show=true;

helper = new HelperConvert();
creatOrEdit:boolean=true;


event: EventModel = new EventModel(); //las variables de event estan el este modelo.
  close() {
    this.show = false;
    setTimeout(() => this.show = true, 5000);
  }


  constructor (private apiSerivice: ApiService){}
  ngOnInit(): void {
    this.event.id= this.iddHijo
    if(this.iddHijo!=null){
      this.apiSerivice.getEventById(this.iddHijo).subscribe((resp: EventModel)=>{
        this.event= resp;
        this.event.fecha_inicio= this.helper.dateConvert(this.helper.stringToDateConvert(this.event.fecha_inicio));
        this.event.fecha_fin= this.helper.dateConvert(this.helper.stringToDateConvert(this.event.fecha_fin));
      });
    }
  }
  guardar (form: NgForm){

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
    if(this.event.id){
      //console.log(form);
      //console.log(this.event);
      peticion=this.apiSerivice.updateEventById(this.event);
    }else{
      peticion=this.apiSerivice.crearEvento(this.event);
    }
    peticion.subscribe(res=>{
      console.log(res);
      Swal.fire({
        title: this.event.nombre,
        text: 'se actualizó Correctamente',
        icon: 'success',
      })
    });

  }

}
