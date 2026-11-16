import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademicoService } from 'src/Services/academico.services';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  ListadoClases:any[];
  ListadoClases_Filtrada:any[];
  Inicio = true;
  ListadoEstudiantes1:any[];
  constructor(private tokenStorage:TokenStorageService,private apiservice:ApiService,
    private auth:AuthService,private apiacademico:AcademicoService,private route:ActivatedRoute) {

    


  }

  Filtrado_Nombre(nombre){
    this.ListadoClases_Filtrada = this.ListadoClases.filter(x => x.nombre.toLowerCase().includes(nombre.toString().toLowerCase()));
    
    if (this.ListadoClases_Filtrada.length > 0) {
      //this.Cantidad = this.ListadoClases_Filtrada.length;
      this.Inicio = false;
      //this.Filtrado_Id = true;
    } else {
      this.Inicio = true;
         // this.Filtrado_Id = true;
        //this.Cantidad = this.ListadoClases_Filtrada.length;
    }



  }


  Filtrado_Grado(grado){
    this.ListadoClases_Filtrada = this.ListadoClases.filter(x => x.seccion.toLowerCase().includes("\""+grado.toString().toLowerCase()+"\""));
    
    if (this.ListadoClases_Filtrada.length > 0) {
      //this.Cantidad = this.ListadoClases_Filtrada.length;
      this.Inicio = false;
      //this.Filtrado_Id = true;
    } else {
      this.Inicio = true;
         // this.Filtrado_Id = true;
        //this.Cantidad = this.ListadoClases_Filtrada.length;
    }

  }

  Filtrado_Grado1(grado){
    this.ListadoClases_Filtrada = this.ListadoClases.filter(x => x.seccion.toLowerCase().includes(grado.toString().toLowerCase()));
    
    if (this.ListadoClases_Filtrada.length > 0) {
      //this.Cantidad = this.ListadoClases_Filtrada.length;
      this.Inicio = false;
      //this.Filtrado_Id = true;
    } else {
      this.Inicio = true;
         // this.Filtrado_Id = true;
        //this.Cantidad = this.ListadoClases_Filtrada.length;
    }

  }

  Filtrado_catedratico(cat){
    //alert(cat)
   
    this.ListadoClases_Filtrada = this.ListadoClases.filter(x => x.grado.toLowerCase().toString().includes(cat.toString().toLowerCase()));
    alert(this.ListadoClases_Filtrada.length)

    if (this.ListadoClases_Filtrada.length > 0) {
      //this.Cantidad = this.ListadoClases_Filtrada.length;
      this.Inicio = false;
      //this.Filtrado_Id = true;
    } else {
      this.Inicio = true;
         // this.Filtrado_Id = true;
        //this.Cantidad = this.ListadoClases_Filtrada.length;
    }

  }



  ngOnInit(): void {
    this.auth.RevalSesion();
//    var usuid = this.tokenStorage.getUser().usu_id;
var id_est = this.route.snapshot.paramMap.get('id');

    this.apiacademico.ObtenerListadoClasesEstudiantes(id_est)
    .subscribe(result => {
      this.ListadoClases = result; 
      this.ListadoClases_Filtrada = result; 
      
      
      
    },
    (error: any) => {
        alert('No existe cursos asignados para este estudiante');
        return;
    });   
   

    
  }

}
