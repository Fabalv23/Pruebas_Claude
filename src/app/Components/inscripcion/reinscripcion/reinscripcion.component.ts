import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-reinscripcion',
  templateUrl: './reinscripcion.component.html',
  styleUrls: ['./reinscripcion.component.css']
})
export class ReinscripcionComponent implements OnInit {

  
  constructor(private tokenStorage:TokenStorageService,private apiservice:ApiService,private auth:AuthService) {

    


  }

  ListadoEstudiantes:any[];
 private Fases = new Array();

  ngOnInit(): void {
    this.auth.RevalSesion();
    var usuid = this.tokenStorage.getUser().usu_id;

    this.apiservice.ObtenerListadoEstudiantesReinscripcion(usuid)
    .subscribe(result => {
      this.ListadoEstudiantes = result; 
    
      
      
    },
    (error: any) => {
        alert('Error al Obtener Listado de Alumnos');
        return;
    });   
    



  }

}
