import { DateModel } from './date.model';
//DateModel es un modelo de datos usado en el helper 'dateConvert' que está en"../helpers/helperConerting.ts"
import { HelperConvert } from './../helpers/helperConverting';

export class EventModel{
    id: number;
    nombre: string;
    archivos: Array<File>;
    descripcion: string;
    fecha_inicio: DateModel;
    fecha_fin: DateModel;
    fechaCreacion: DateModel;
    fechaModificacion: DateModel;
    arvhivo: any;

    //files:Array<File>;
    f:Date;  
    constructor(){
        var currentTime=new Date
        this.archivos= null;
        var helper = new HelperConvert();
        this.fecha_inicio= helper.dateConvert(currentTime);
        this.fecha_fin= helper.dateConvert(currentTime);
    }
    
}