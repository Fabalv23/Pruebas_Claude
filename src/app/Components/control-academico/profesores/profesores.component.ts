import { Component, OnInit } from '@angular/core';
import { AcademicoService } from 'src/Services/academico.services';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.css']
})
export class ProfesoresComponent implements OnInit {

  ListadoProfesores = [];
  ListadoProfesores_filtro = [];

  general = true;

  constructor(private tokenStorage:TokenStorageService,private apiservice:ApiService,private auth:AuthService,private apiacademico:AcademicoService) {

    


  }


  Filtrado_catedratico(val){

    if(val){
    //alert(cat)
   
    this.ListadoProfesores_filtro = this.ListadoProfesores.filter(x => x.fullname.toLowerCase().toString().includes(val.toString().toLowerCase()));
    
    }else{
      this.ListadoProfesores_filtro = []
    }



  }




  ngOnInit(): void {
    this.auth.RevalSesion();
    this.apiacademico.ObtenerListadoProfesores()
    .subscribe(result => {
      
      this.ListadoProfesores = result; 
      
    },
    (error: any) => {
        alert('Error al Obtener Listado de Profesores');
        return;
    });   
   



    
  }

}
