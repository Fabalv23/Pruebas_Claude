import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademicoService } from 'src/Services/academico.services';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

 
  ListadoTareas:any;
  ListadoEstudiantes1:any[];

  titulo: string;
  descripcion: string;
  punteo: any;
  fecha: string;
  estado:any;
  calificacion:any;
  nota_baja = false;
tarde:any;
  entrega_tarde = false;
  constructor(private tokenStorage:TokenStorageService,private apiservice:ApiService,
    private auth:AuthService,private apiacademico:AcademicoService,private route:ActivatedRoute) {

    


  }


  traduccion(palabra) {


    switch (palabra) {
      case 'RETURNED':

        return 'CALIFICADO';

      case 'TURNED_IN':

        return 'ENTREGADO';

      case 'CREATED':

        return 'NO ENTREGADO';

      case 'true':
      this.entrega_tarde = true;
        return 'TARDE';

      default:

      return '';

    }


  }


  valLimite(nota){

    if(nota){
      let porcentaje = 0.7;

      let comprobar = this.punteo * porcentaje;

      if(nota<comprobar){
        return true
      }else{
        return false;
      }

    }else{
      return false
    }

  }

  ngOnInit(): void {
    this.auth.RevalSesion();
//    var usuid = this.tokenStorage.getUser().usu_id;
var id_est = this.route.snapshot.paramMap.get('id');
var material = this.route.snapshot.paramMap.get('id3');

    this.apiacademico.ObtenerDetalleTarea(id_est,material)
    .subscribe(result => {
      this.ListadoTareas = result.toString().trim(); 
      if(result.title){
        this.titulo = result.title.toString().trim();
      }else{
        this.titulo = ""
      }
      if(result.description){
        this.descripcion =  result.description.toString().trim();
      }else{
        this.descripcion = ""
      }
      this.punteo = result.maxpoints;
      this.fecha = result.duedate + ' ' + result.duetime
      this.estado = this.traduccion(result.state)
      this.tarde = this.traduccion(result.late)
      this.calificacion = result.assignedgrade
      this.nota_baja = this.valLimite(result.assignedgrade)
    },
    (error: any) => {
        alert('Error al Obtener detalle');
        return;
    });   
   

    
  }

}
