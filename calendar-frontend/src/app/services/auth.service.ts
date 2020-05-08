import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { UserModel } from './../models/user.model';
import { map } from 'rxjs/operators';
const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
};
@Injectable ({
    providedIn: 'root'
})
export class AuthService{
    
    private url = 'http://127.0.0.1:8000/api/';
    userToken: string;
    
    constructor(private http: HttpClient){
        this.leerToken();
    }

    login(user: UserModel){
        return  this.http.post(`${this.url}login`,user,httpOptions).pipe(
            map( resp=>{
                console.log('entro en el rxjs');
                this.guardarToken(resp['token']);
                return resp;
            })
        );
    }
    logout(){
        localStorage.removeItem('token');
    }

    private guardarToken( idToken:string ){
        this.userToken = idToken;
        localStorage.setItem('token', idToken);
    }

    leerToken(){
        if(localStorage.getItem('token')){
            this.userToken= localStorage.getItem('token');
        }else{
            this.userToken='';
        }

        return this.userToken;
    }

    estaAutenticado(): boolean{
        //let a:string="jklfdkjldfs";
        if(this.userToken.length ==0){
               return false;
        }else{
            return true;
        }
    }
    
}