import { EventModel } from './../../models/event.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import {ApiService} from './../../services/api.service'
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
  
})
export class EventComponent implements OnInit {
//componente hijo su padre es events
@Input() idHijo: string; //para pasarle el id del evento al modal.
model: NgbDateStruct; //pa ra la ventana modal
show=true;

event: EventModel = new EventModel(); //las variables de event estan el este modelo.


 close() {
  this.show = false;
  setTimeout(() => this.show = true, 5000);
  }
  constructor (private apiSerivice: ApiService){}
  ngOnInit(): void {
  }
  
  guardar (form: NgForm){
    console.log(form);
    console.log(this.event);

    if(form.invalid){
      console.log('formulario invalido');
      return;
    }
    let t:Date= new Date();
  
    console.log(t.getDate());
    this.apiSerivice.crearEvento(this.event).subscribe(res=>{
      console.log(res);
    })
  }
  
}
