

import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { EventModel } from './../models/event.model';
import {map} from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
      //,'Authorization': "Bearer " + this.currentUser.token
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
        
        return  this.http.get(url);
     }
     getAllEventos(){
         return this.getQuery ('api/events/getall');
     }
     
     getDesciption(id: string){
         return this.getQuery (`api/events/findbyid/${id}`);
     }
     //Crear un nuevo evento

     crearEvento(event: EventModel){
        return this.http.post('http://127.0.0.1:8000/api/events/add',event,httpOptions)
        .pipe(
            map( (resp:any)=>{
                event.id=resp.id;
                return event;
            })
        )
     }
     getAllEventosMod(){
        //return this.getQuery ('api/events/getallmod');
        return this.getQuery ('api/events/getallmod')
        .pipe(
            map(this.crearArreglo)
        );
    }
    crearArreglo(eventObj:Object){
        const events: EventModel []=[];
        //console.log(eventObj);
        if(eventObj===null){
            return[];
        }
        Object.keys(eventObj).forEach(item=>{
            const event: EventModel= eventObj[item];
            events.push(event);
        });
       return events;
    }

    getEventById(id){
        return this.getQuery (`api/events/findbyid/${id}`);
    }

    updateEventById(event: EventModel){ 
        return this.http.put(`http://127.0.0.1:8000/api/events/updatemod/${event.id}`,event);
    }

    deleteEventById(id:number){
        return this.http.delete(`http://127.0.0.1:8000/api/events/delete/${id}`);
    } 
}