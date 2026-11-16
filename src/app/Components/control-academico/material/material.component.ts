import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { validar_maxpoint } from 'src/app/functions';
import { AcademicoService } from 'src/Services/academico.services';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  general = true;
  ListadoTareas:any[];
  Aldia = true;
  ListadoTareas_Filtro:any[];
  ListadoEstudiantes1:any[];
  constructor(private tokenStorage:TokenStorageService,private apiservice:ApiService,
    private auth:AuthService,private apiacademico:AcademicoService,private route:ActivatedRoute) {

    


  }

  convFecha(tarea){
    let fecha = "";
    if(tarea.duedate){
      fecha = tarea.duedate 

        if(tarea.duetime){
          fecha = fecha + ' ' + tarea.duetime
        }
    }

    return fecha


  }

  traduccion(palabra) {


    switch (palabra) {
      case 'ASSIGNMENT':

        return 'TAREA';

      case 'SHORT_ANSWER_QUESTION':

        return 'PREGUNTA';

      case 'CREATED':

        return 'NO ENTREGADO';


      default:

      return '';

    }


  }


  ngOnInit(): void {
    this.auth.RevalSesion();
//    var usuid = this.tokenStorage.getUser().usu_id;
var id_est = this.route.snapshot.paramMap.get('id2');

    this.apiacademico.ObtenerListadoTareasEstudiantes(id_est)
    .subscribe(result => {
      

      var lista_filtrada = [];

      for (let index = 0; index < result.tareas.length; index++) {
        const element = result.tareas[index];

        if (element) {

          var nombre = element.title

          if (nombre) {

            var abreviatura = nombre.toString().substring(0, 3);
            //console.log(abreviatura);

            var expreg = new RegExp("^[A-Z]{1}\\d{2}$");

            if (expreg.test(abreviatura)) {
              //console.log(abreviatura + ' bien')
              console.log(element)
              if(validar_maxpoint(element,result.curso)){
              lista_filtrada.push(element)
            }
            } else {
              //console.log(abreviatura + ' mal')

            }



          }
        }
      }

      
      this.ListadoTareas = lista_filtrada; 
      
      
      
    },
    (error: any) => {
        alert('Error al Obtener Listado de Tareas');
        return;
    });   
   

    this.apiacademico.ObtenerSaldoEstudiantev2(this.route.snapshot.paramMap.get('id'))
    .subscribe(result => {
       if(result.saldo>0){
         this.Aldia = false
       }else {
         this.Aldia = true
       }
      
      
      
    },
    (error: any) => {
        alert('Error al Obtener saldo');
        return;
    });   
    
  }

  onChange(val){
    if(val=="TODOS"){
      this.general = true
    }else{
      this.ListadoTareas_Filtro = this.ListadoTareas.filter(x=>x.unidad == val)
      this.general = false
    }
   
  }

}
