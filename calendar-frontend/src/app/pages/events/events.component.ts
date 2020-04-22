import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
    
})
export class EventsComponent implements OnInit {
  //componente padre su 
  idPadre:string='0';
  closeResult: string;
  constructor(private modalService: NgbModal) { }
  
  ngOnInit(): void {
  }
  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }
 

}
