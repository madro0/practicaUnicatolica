
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
import { HttpRequest } from '@angular/common/http';

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

fileToUpload:File=null;


closeImg() {
  this.show = false;
  setTimeout(() => this.show = true, 5000);
}

//
trueimg:Boolean = false;
loader:Boolean = false;
myimg:string;
final:Boolean = true;
msn:string;
//

public fileUpload:Array<File>;
public files:Array<File>

private base64textString:string ='';
base64textString2 = [];

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
    console.log(this.event.archivos);
    console.log(this.event.descripcion);
    

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
      //this.event.archivos = this.fileToUpload; 
      peticion=this.apiService.updateEventById(this.event);
      this.createOrRead=false;
    }else{
      //si no creo
      //this.event.archivos=this.files[0];
      //console.log(this.event.archivos);
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
    peticion.subscribe(res =>{

      //this.apiService.uploadImage(this.fileUpload, res.id );
      //console.log(res);
      Swal.fire({
        title: this.event.nombre,
        text: mensaje,
        icon: 'success',
      });
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
  handleFileInput(files: FileList) {
    //console.log(this.fileToUpload = files.item(0));
    //this.event.archivos= files.item(0);
    this.fileToUpload= files.item(0);
    let form = new FormData();
      form.append('file', files.item(0));
      form.set('nombre', 'daniel');
      this.apiService.subirFoto(form).subscribe(
        resp => {
         console.log(resp);
         
        });
  }

  subir (fileImput:any){
      this.fileUpload = <Array<File>>fileImput.target.files;
      this.files=  <Array<File>>fileImput.target.files;
      //this.apiService.uploadImage(this.fileUpload );
      /*
      this.apiService.uploadImage(this.fileUpload).then(function(resolve) {
        
        console.log(resolve); // Success!
      }, function(response) {

        Swal.fire({
          title: 'Error',
          text: response.error,
          icon: 'error',
        });
      });
     */
    
    /*
    if (this.files[0] ) {
      var reader = new FileReader();

      reader.onload =this._handleReaderLoaded.bind(this);

      this.base64textString;

      //reader.readAsBinaryString(this.files[0]);
      //console.log(this.base64textString);
      reader.onload =this._handleReaderLoaded.bind(this);

      reader.readAsBinaryString(this.files[0]);
      //console.log(reader.readAsBinaryString(this.files[0]));
      
      */
////a ver si aqui funciona bien esta mamada
     /*var reader = new FileReader();

     
     reader.readAsDataURL(this.files[0]);
      
     
    reader.onload =function(){ 
       
        
    }
     //console.log( reader.toString());
     console.log(reader.result);
    
    reader.onerror = function (error) {
       console.log('Error: ', error);
     };
    console.log("lkhdfshjadfs "+ this.base64textString);
      this.apiService.uploadImage2(this.base64textString).subscribe( resp=>{
        console.log(resp);
      }, err=>{
        console.log(err);
      })
    */
   var event = new EventModel(); 
   

   this.getBase642(this.files[0],  this.escribir);

   console.log("medio");
   
   console.log(this.base64textString);
  }
  escribir(result){
    var ds= 'dsf'; 
    //console.log(result);
    
    
    EventModalComponent.prototype.base64textString= result;
    //console.log("aja : "+ result);
    
    
  }
  getBase642(file, callback){
  
    console.log(btoa(file));
  var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = function (){
      callback(reader.result as string);
      
   };
   reader.onerror = function (error){
      console.log('Erro; ', error)
   }
  }

   _handleReaderLoaded2(file) {
    let reader = file;
    //this.imageSrc = reader.result;
    //console.log(this.imageSrc);
    this.base64textString = reader.result as string;
    

  }
  

onUploadChange(evt: any) {
  const file = evt.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
  console.log(this.base64textString2);
}

handleReaderLoaded(e) {
  this.base64textString2.push('data:image/png;base64,' + btoa(e.target.result));
 
}

   
  getBase64(file): string {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //console.log(reader.result);
       reader.result as string;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return null;
    };
    return null;
 }

 private imageSrc: string = '';

 handleInputChange(e) {
   var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
   var pattern = /image-*/;
   var reader = new FileReader();
   if (!file.type.match(pattern)) {
     alert('invalid format');
     return;
   }
   reader.onload = this._handleReaderLoaded.bind(this);
   //reader.readAsBinaryString(file);
   //reader.onloadend(e);
   console.log(this.imageSrc);
 }
 _handleReaderLoaded(e) {
   let reader = e.target[0];
   //this.imageSrc = reader.result;
   console.log(reader.result);
   this.base64textString= reader.result as string;
 }

  
  subiendoando(ev){
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    console.log(this.base64textString);
  }
    
  

  
}
