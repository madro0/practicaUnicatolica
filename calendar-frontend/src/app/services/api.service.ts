import { AuthService } from './auth.service';


import {HttpClient} from '@angular/common/http';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { EventModel } from './../models/event.model';
import {map} from 'rxjs/operators';

const rootUrl='http://127.0.0.1:8000/api/events/';
        
@Injectable ({
    providedIn: 'root'
})

export class ApiService{
    
    private authHeader;
    private currentToken;
    
    constructor(private http: HttpClient, private auth: AuthService){
        if(localStorage.getItem('token')){
            this.setToken();
        }
    }
    

    setToken(){

          this.authHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('token')
          });
      }

    //centralizar los query http
     getQueryGet( query: string){
        const url = `http://127.0.0.1:8000/${query}`;
        
        return  this.http.get(url);
     }
     getAllEventos(){
         return this.http.get(`${rootUrl}getall`);
     }
     
     getDesciption(id: string){
         return this.http.get (`${rootUrl}findbyid/${id}`);
     }
     //Crear un nuevo evento

     crearEvento(event: EventModel){
        return this.http.post(`${rootUrl}security/add`,event,{ headers: this.authHeader })
        .pipe(
            map( (resp:any)=>{
                event.id=resp.id;
                return event;
            })
        )
     }
     getAllEventosMod(){
        //return this.getQuery ('api/events/getallmod');
        return this.http.get (`${rootUrl}security/getall`,{ headers: this.authHeader })
        .pipe(
            map(this.crearArreglo)
        );
        //return this.http.get<HttpResponse<any>>(`${rootUrl}security/getall`,{ headers: this.authHeader, observe: 'response' })
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
        return this.http.get (`${rootUrl}security/findbyid/${id}`,{ headers: this.authHeader });
    }

    updateEventById(event: EventModel){ 
        return this.http.put(`${rootUrl}security/update/${event.id}`,event, {headers: this.authHeader});
    }

    deleteEventById(id:number){
        return this.http.delete(`${rootUrl}security/delete/${id}`,{headers: this.authHeader});
    } 
}