import { Component, OnInit } from '@angular/core';
import { AcademicoService } from 'src/Services/academico.services';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-excusa',
  templateUrl: './excusa.component.html',
  styleUrls: ['./excusa.component.css']
})
export class ExcusaComponent implements OnInit {
  ListadoEstudiantes:any[];
  constructor(private tokenStorage:TokenStorageService,private apiservice:ApiService,private auth:AuthService,private apiacademico:AcademicoService) {

  }

  ngOnInit(): void {
    this.auth.RevalSesion();
    var usuid = this.tokenStorage.getUser().usu_id;

    this.apiacademico.ObtenerListadoEstudiantes(usuid)
    .subscribe(result => {
      this.ListadoEstudiantes = result; 
      
      
      
    },
    (error: any) => {
        alert('Error al Obtener Listado de Alumnos');
        return;
    });   

  }

}
