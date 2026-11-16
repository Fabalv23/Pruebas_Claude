import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Services/api.services';
import { AcademicoService } from 'src/Services/academico.services';

import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-boletin',
  templateUrl: './boletin.component.html',
  styleUrls: ['./boletin.component.css']
})
export class BoletinComponent implements OnInit {
  ListadoEstudiantes:any[];
  ListadoEstudiantes1:any[];
  constructor(private tokenStorage:TokenStorageService,private apiservice:ApiService,private auth:AuthService,private apiacademico:AcademicoService) {

    


  }

  ngOnInit(): void {
    this.auth.RevalSesion();
    var usuid = this.tokenStorage.getUser().usu_id;

    this.apiacademico.ObtenerListadoEstudiantes(usuid)
    .subscribe(result => {
      this.ListadoEstudiantes = result; 
        console.log(this.ListadoEstudiantes);
      
      
    },
    (error: any) => {
        alert('Error al Obtener Listado de Alumnos');
        return;
    });   
   

    
    this.apiservice.ObtenerListadoEstudiantesPReinscritos(usuid)
    .subscribe(result => {
      this.ListadoEstudiantes1 = result; 
      
      
      
    },
    (error: any) => {
        alert('Error al Obtener Listado de Alumnos');
        return;
    });   

  }

}
