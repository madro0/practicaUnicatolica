import { FileModel } from 'src/app/models/file.model';
import { DateModel } from '../models/date.model';


export class HelperConvert{
    //dateModel: DateModel = new DateModel();
    constructor(){}

    //este helper sirve para convertir cualquier variable de tipo Date en un array del tipo {year:2020, month:4, day:21}
    //asi le puedo enviar y resivir a/desde el api, fechas de una manera mas facil. 
    dateConvert( date: Date): DateModel{
        var dateModel = new DateModel();
        dateModel.year = date.getFullYear();
        dateModel.month = date.getMonth()+1;
        dateModel.day = date.getDate();
        return dateModel;
    }
    stringToDateConvert(arrayDate :DateModel): Date{
        let stringDate = `${arrayDate.year}-${arrayDate.month}-${Number(arrayDate.day)+1}`;
        let date= new Date(stringDate);
        return date;
    }
    
   
}