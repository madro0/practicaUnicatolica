
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
import { FileModel } from 'src/app/models/file.model';


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
show2=false;

//bandera para determinar si envio el msm de crear o actualizar
createOrRead=true;

fileToUpload:File=null;




//
trueimg:Boolean = false;
loader:Boolean = false;
myimg:string;
final:Boolean = true;
msn:string;
//

public fileUpload:Array<File>;
public files:Array<File>
//subirArchivos
base64textString2 = [];
subidoOError= false;
image;
//
src;

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
        if( this.event.archivos.ext!='' || this.event.archivos.fileName!=''){
            this.show2=true;
            this.src= this.renderImage(this.event.archivos);
            
        }else{
          this.show2=false;
        }
        
      }, err=>{
        if(err.error.message=="Expired JWT Token"){
          console.log('saliendo...')
          this.auth.logout();
        }
      });
    }
  }
  guardar(form: NgForm){
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
    
      peticion=this.apiService.updateEventById(this.event);
      this.createOrRead=false;
    }else{
      
      console.log(this.event);
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
      console.log(res);
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

   uploadImg(evt: any){
    var file = evt.dataTransfer ? evt.dataTransfer.files[0] : evt.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      //this.event.archivos=null;
      return;
    }else{
     if (file) {
      this.readThis(evt.target);
    }
  }
}
   
   readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
      //this.image = myReader.result
      this.image = myReader.result;
      this.show2=true;
      var fileModel = new FileModel;

      
     
      var auxext = file.type.replace('image/','');
      if(auxext=='jpeg'){
        fileModel.ext='jpg';
      }else{
        fileModel.ext=auxext;
      }
      fileModel.base64= myReader.result as string;
      fileModel.base64= fileModel.base64.replace(`data:image/${auxext};base64,`,'');
      fileModel.fileName=file.name;
      fileModel.fileName= fileModel.fileName.replace(`.${fileModel.ext}`,'');
      
      
      this.event.archivos = fileModel
    
     
      this.src= `data:image/${auxext};base64,${this.event.archivos.base64}` 

    }
    myReader.readAsDataURL(file);
  }
  //controlador de imageBox
  closeImg() {
    //this.show = false;
    this.show2=false;
    var fileModel = new FileModel();
    fileModel.id='';
    fileModel.base64='';
    fileModel.ext='';
    fileModel.fileName='';
    this.event.archivos = fileModel;
    //setTimeout(() => this.show = true, 5000);
  }

  renderImage(image: FileModel):string{
    //console.log( btoa(`http://localhost:8000/uploads/eventsImg/${image.id}name${image.fileName}.${image.ext}`));
    //reader.readAsBinaryString(file);
    return `http://localhost:8000/uploads/eventsImg/${image.id}name${image.fileName}.${image.ext}`;
  }
 

  
  
}
