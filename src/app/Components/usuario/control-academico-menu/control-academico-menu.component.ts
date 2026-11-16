import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Services/api.services';

@Component({
  selector: 'app-control-academico-menu',
  templateUrl: './control-academico-menu.component.html',
  styleUrls: ['./control-academico-menu.component.css']
})
export class ControlAcademicoMenuComponent implements OnInit {

  constructor(private api:ApiService) { }

  boletin=false;
  ngOnInit(): void {

    this.api.ObtenerFechaBoletin().subscribe((data1)=>{
      this.boletin = data1.vigente;
    })
  }

}
