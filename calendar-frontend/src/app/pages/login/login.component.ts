import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ApiService } from './../../services/api.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, NgModule } from '@angular/core';
import { UserModel} from '../../models/user.model';
import { retry, catchError, sample } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  usuario: UserModel = new UserModel();
  recordarme= false;


  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('email')){
      this.usuario.username = localStorage.getItem('email');
      this.recordarme=true;
    }

  }
  
  login(form: NgForm ){

    if(form.invalid){
      return;
    }
    Swal.fire({
      allowOutsideClick:false,
      icon: 'info',
      text: 'Espere un momento por favor...'
    });
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(res =>{
        console.log(res);
        Swal.close();
        this.router.navigateByUrl('/events');
        
        if(this.recordarme==true){
          localStorage.setItem('email', this.usuario.username);
        }

    }, err=>{
        console.log(err.error.code);
        Swal.fire({
          icon:'error',
          title: err.error.message,
          text: err.error.code,
        })
    });
    
    //console.log(this.usuario);
    //console.log(form);
  }
}
