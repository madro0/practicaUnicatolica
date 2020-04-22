import { EventModel } from './../models/event.model';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};


@Injectable ({
    providedIn: 'root'
})
export class ApiService{
    constructor(private http: HttpClient){
    }

    //centralizar los query http
     getQuery( query: string){
        const url = `http://127.0.0.1:8000/${query}`;
        
        return this.http.get(url);
     }
     getAllEventos(){
         return this.getQuery ('api/events/getall');
     }
     getDesciption(id: string){
         return this.getQuery (`api/events/findbyid/${id}`);
     }
     //Crear un nuevo evento

     crearEvento(event: EventModel){
        var nombre= 'a ver a ver';
        var archivos= '';
        var descripcion= 'segunda descripcion';
        //var EventModel=event.fechaFin
        var t= new Date;

        console.log(event.fecha_inicio);
       
        //event.fecha_inicio= "2170101";
        
        return this.http.post('http://127.0.0.1:8000/api/events/add',event,httpOptions);
     }
}