import { AuthService } from './auth.service';


import {HttpClient} from '@angular/common/http';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { EventModel } from './../models/event.model';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

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
            'Content-Type': 'application/json'
            //'Authorization': "Bearer " + localStorage.getItem('token')
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

        //formData.append("fileData", event.archivos);
        console.log(event.archivos.base64);
        return this.http.post(`${rootUrl}security/add`,event,{ headers: this.authHeader })
        .pipe(
            map( (resp:any)=>{
                event.id=resp.id;
                return event;
            })
        );
     }
     
    subirFoto(datos:any){         
        return this.http.post(`${rootUrl}security/add`, datos, { headers: this.authHeader });
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



    //
    subirImagen(datos:any):Observable<any>{
        console.log(datos);
        return this.http.post(`${rootUrl}security/add`, datos, { headers: this.authHeader });
    }

    uploadImage(files:Array<File>, s){
        var event: EventModel;

		return new Promise(
			(resolve, reject)=>{
				var formData:any = new FormData();
				var xhr = new XMLHttpRequest();

				var name_file = 'archivos';
				
                //formData.append(name_file, files[0], files[0].name);
                formData.append("name_file", s);
				xhr.onreadystatechange = function() {
					if(xhr.readyState == 4) {
						if(xhr.status == 200){
                            console.log(JSON.parse(xhr.response).archivo);
                            //console.log(xhr.status);
                            

						}else{
                            //console.log(xhr.response);
                            reject(JSON.parse(xhr.response));
                            //console.log(JSON.parse(xhr.response));
						}
					}
				}
/*
				xhr.upload.addEventListener("progress", function(event:any){
					var percent = (event.loaded / event.total) * 100;
					var prc = Math.round(percent).toString();
					
				}, false);

				xhr.addEventListener("load", function() {
                    //document.getElementById("status").innerHTML = "Imagen subida con exito!";
                    console.log("Imagen subida con exito!");
					
				}, false);

				xhr.addEventListener("error", function (argument) {
                    //document.getElementById("status").innerHTML = "Subida abortada";
                    console.log("Subida abortada");
                }, false);
                */
				xhr.open("POST", `${rootUrl}security/add/uploadImg`, true);
				xhr.send(formData);
            }
            
		);
    }
    
    uploadImage2(s){
        //console.log(s);
        var json={
            archivos: s
        }
        //return this.http.post(`${rootUrl}security/add/uploadImg`,json,{ headers: this.authHeader });
        let event= new EventModel();
        event.descripcion='holis';
        return this.http.post(`${rootUrl}security/add/uploadImg2`,event, {headers: this.authHeader});
        //return this.http.delete(`${rootUrl}security/delete/${id}`,{headers: this.authHeader});
	}
    
}