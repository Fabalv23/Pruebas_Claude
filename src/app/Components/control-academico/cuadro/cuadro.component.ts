import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { validar_maxpoint } from 'src/app/functions';
import { AcademicoService } from 'src/Services/academico.services';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-cuadro',
  templateUrl: './cuadro.component.html',
  styleUrls: ['./cuadro.component.css']
})
export class CuadroComponent implements OnInit {

  actividades;
  cuadro_notas;
  spinner = true;
  unidad = "";
  catedratico = "";
  calificaciones;
  calificaciones_filtro;
  estudiante;
  codigo;
  mostrar = false;
constructor(private tokenStorage: TokenStorageService, private apiservice: ApiService,
  private auth: AuthService, private apiacademico: AcademicoService, private route: ActivatedRoute) {

    var curso = this.route.snapshot.paramMap.get('id2');
    var est = this.route.snapshot.paramMap.get('id');

    var nombre_curso;
    this.apiacademico.ObtenerListadoTareasEstudiantes(curso).subscribe((result) => {
      nombre_curso = result.curso;
    this.apiacademico.ObtenerCuadroResumenEstudianteLista(curso,est)
    .subscribe(result => {
      this.actividades = result.actividades;
      this.cuadro_notas = result.notas;
      this.spinner = false;
     this.unidad = result.unidad;
     this.catedratico = result.catedratico;

     var lista_filtrada = [];

     for (let index = 0; index < result.cuadro.length; index++) {
       const element = result.cuadro[index];

       if (element) {

         var nombre = element.title

         if (nombre) {

           var abreviatura = nombre.toString().substring(0, 3);
           //console.log(abreviatura);

           var expreg = new RegExp("^[A-Z]{1}\\d{2}$");

           if (expreg.test(abreviatura)) {
             //console.log(abreviatura + ' bien')
             //console.log(element)
             var existe_actividad =this.actividades.filter(x=>x.title==element.title);

             if(existe_actividad.length>0){
              if(validar_maxpoint(existe_actividad[0],nombre_curso)){
                lista_filtrada.push(element)
               }
             }

           } else {
             //console.log(abreviatura + ' mal')

           }



         }
       }
     }




     //this.calificaciones_filtro = result.cuadro
     this.calificaciones_filtro = lista_filtrada
     this.calificaciones = lista_filtrada;

     this.estudiante = result.estudiante;
     this.codigo = result.codigo;
     //console.log(this.calificaciones_filtro)
    },
      (error: any) => {
        alert('Error al Obtener Listado de Entregas');
        return;
      });

    },
    (error: any) => {
      alert('Error al Obtener nombre de curso');
      return;
    });





  }


  onChange(val){
    this.calificaciones_filtro = this.calificaciones.filter(x=>x.unidad == val)
    this.mostrar = true
  }

  convCodigo(codigo) {
    if (codigo) {
      let cod = codigo.toString().substring(0, 7);

      cod = cod.toUpperCase()

      cod = cod.substring(0, 2) + '-' + cod.substring(2, 3) + '-' + codigo.substring(3, 7)

      return cod
    } else {
      return ""
    }
  }
  sumar_notafinal_reglatres(notas) {
    let total = 0;
    if (notas) {
      notas.forEach(element => {
        if (element.title.toString().startsWith('C0')) {

          let x = element.assignedgrade
          if (x) {
            total = total + parseFloat(x)
          } else {
            x = 0;
            total = total + parseFloat(x)

          }



        } else {
          let x = element.assignedgrade
          if (x) {
            total = total + parseFloat(x)
          } else {
            x = 0;
            total = total + parseFloat(x)

          }
        }

      });
    }

    if (total > 0) {
      total = (total * 100) / 70;
    }

    return Math.round(total)
  }
  sumar_notafinal(notas){
   let total = 0;
   if(notas){
    notas.forEach(element => {
      if (element.title.toString().startsWith('E0')) {

        let x = element.assignedgrade
        if (x) {
          total = total + parseFloat(x)
        } else {
          x = 0;
          total = total + parseFloat(x)

        }



      } else {
        let x = element.assignedgrade
        if (x) {
          total = total + parseFloat(x)
        } else {
          x = 0;
          total = total + parseFloat(x)

        }
      }

    });
  }
    return  total
  }

  ValidarNombre(titulo){

    return titulo.substring(0,4)

  }

  convNota(nota, borrador, title) {


    if (title.toString().startsWith('E0')) {

      if (borrador) {
        return nota //para poner la nota en borrador
      } else {
        return 0
      }


    } else {
      if (nota) {
        return nota
      } else {
        return 0
      }

    }


  }

ngOnInit(): void {
}

}
