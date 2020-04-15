import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

@Injectable ({
    providedIn: 'root'
})
export class ApiService{
    constructor(private http:HttpClient){
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
         return this.getQuery (`api/events/findbyid/${id}`)
     }
}