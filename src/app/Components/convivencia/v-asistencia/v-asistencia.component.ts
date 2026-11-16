import { Component, OnInit } from '@angular/core';
import { mGrado } from 'src/models/mGrado';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { saveAs } from 'file-saver';
import { ConvivenciaService } from 'src/Services/convivencia.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-v-asistencia',
  templateUrl: './v-asistencia.component.html',
  styleUrls: ['./v-asistencia.component.css']
})
export class VAsistenciaComponent implements OnInit {


  grados: mGrado[];
  ListadoEstudiantes: any[] = [];
  ListadoEstudiantes_Filtrado: any[] = [];
  semanas = [];
  Cantidad;
  grado_seleccionado = "";
  seccion_seleccionada = "TODOS";
  mail = "";
  id_grado = 0;
  fecha_consulta = null;
  fecha_inicio = null;
  fecha_fin = null;
  tipo_consulta = 0;
  spinner = false;
  codigo_estudiante = "";

  pre_primaria = false;
  primaria = false;
  secundaria = false;
  nocturna = false;
  Listado_Estudiantes_Preseciales = [];

  constructor(private apiservice: ApiService, private auth: AuthService, private tokenStorage: TokenStorageService, private api_convivencia:ConvivenciaService, private route:ActivatedRoute) {



    api_convivencia.ObtenerListadoEstudiantesPresencial().subscribe((data)=>{
      
      this.Listado_Estudiantes_Preseciales = data;

    });


  }

  BuscarGrado(grado) {
    this.id_grado = grado;
    this.grado_seleccionado = this.grados.filter(x => x.grad_id == grado)[0].grad_nombre;
  }

  AsignarCodigo(codigo) {
    this.codigo_estudiante = codigo;
  }
  consultar() {
    if (this.codigo_estudiante != "") {
      if (this.fecha_consulta != null || (this.fecha_inicio != null && this.fecha_fin != null)) {
        this.spinner = true;

        var data = {
          codigo: this.codigo_estudiante,
          fecha_unica: this.fecha_consulta,
          fecha_inicio: this.fecha_inicio,
          fecha_fin: this.fecha_fin
        }


        this.api_convivencia.ObtenerHistorialAsistenciaEstudiante(data).subscribe((data) => {
          this.ListadoEstudiantes_Filtrado = data.resultado_final;
          this.ListadoEstudiantes = data.resultado_final;
          this.Cantidad = this.ListadoEstudiantes_Filtrado.length;
          this.spinner = false;
          this.grado_seleccionado = data.grado
          this.seccion_seleccionada = data.seccion
          this.mail = data.mail
          this.semanas = data.semanas;
          switch(data.nivel){
            case '1':
              this.pre_primaria = true;
              this.primaria = false;
              this.secundaria = false;
              this.nocturna = false;
              break;
            case '2':
              this.pre_primaria = false;
              this.primaria = true;
              this.secundaria = false;
              this.nocturna = false;

              break;
            case '3':
              this.pre_primaria = false;
              this.primaria = false;
              this.secundaria = true;
              this.nocturna = false;
              break;
            case '4':
              this.pre_primaria = false;
              this.primaria = false;
              this.secundaria = false;
              this.nocturna = true;
            break;
          }

        }, err => {
          alert('Algo salió mal');
          location.reload();
        })
      } else {
        alert('Seleccione una fecha o un rango de fechas');
        return;
      }
    } else {
      alert('Por favor ingrese un código de estudiante');
      return;
    }
  }

  BuscarSeccion(seccion) {

    this.seccion_seleccionada = seccion;

  }

  ngOnInit(): void {
    this.auth.RevalSesion();

    this.codigo_estudiante = this.route.snapshot.paramMap.get('codigo');


    this.apiservice.getGrados().subscribe((data) => {

      this.grados = data

      this.grados.sort((a, b) => a.grad_id - b.grad_id);

    })



  }

  tipo(data, check) {

    if (check) {

      switch (data) {
        case 1:
          this.tipo_consulta = 1
          break;
        case 2:
          this.fecha_consulta = null;
          this.tipo_consulta = 2;
          break;
      }
    }
  }

  asignar_fecha(campo, data) {

    switch (campo) {
      case 1:
        this.fecha_consulta = data;
        break;
      case 2:
        this.fecha_inicio = data;
        break;
      case 3:
        this.fecha_fin = data;
        break;

    }
  }

  convFecha_recortar(fecha) {
    if (fecha) {
      var date = new Date(fecha);
      date = new Date(date.valueOf() + 21600000);


      if (date.toLocaleString("es-GT").substring(0, 2).includes('/')) {
        var recortar = date.toLocaleString("es-GT").substring(0, 9)
      } else {
        var recortar = date.toLocaleString("es-GT").substring(0, 10)
      }

      return recortar.replace(',', ' ');
    }
    return null
  }

  convFecha(fecha) {
    if (fecha) {
      var date = new Date(fecha);
      date = new Date(date.valueOf() + 21600000);


      return date.toLocaleString("es-GT");
    }
    return null
  }

  tipo_asistencia(data) {
    switch (data) {
      case 1:
        return 'Asistió'
      case 2:
        return 'No asistió'
      case 3:
        return 'Inasistencia justificada'
      case 4:
        return 'Asistió tarde'

    }

  }

  Filtrado_Codigo(data) {

    if (data && data != '') {
      this.ListadoEstudiantes_Filtrado = this.ListadoEstudiantes.filter((x) => x.codigo.toString().startsWith(data));

    } else {
      this.ListadoEstudiantes_Filtrado = this.ListadoEstudiantes;
    }

  }

  Filtrado_Clave(data) {

    if (data && data != '') {
      this.ListadoEstudiantes_Filtrado = this.ListadoEstudiantes.filter((x) => x.clave == data);
    } else {
      this.ListadoEstudiantes_Filtrado = this.ListadoEstudiantes;
    }

  }

  Filtrado_Periodo(data) {

    if (data && data != '') {
      this.ListadoEstudiantes_Filtrado = this.ListadoEstudiantes.filter((x) => x.nombre.toString().startsWith(data));
    } else {
      this.ListadoEstudiantes_Filtrado = this.ListadoEstudiantes;
    }

  }

  Filtrado_Semana(data) {
    if (data && data != '') {
      this.ListadoEstudiantes_Filtrado = this.ListadoEstudiantes.filter((x) => x.semana.toString().startsWith(data));
    } else {
      this.ListadoEstudiantes_Filtrado = this.ListadoEstudiantes;
    }
  }

  debe_ser_presencial(codigo){

    if(this.Listado_Estudiantes_Preseciales.filter(x=>x.codigo == codigo).length >0){
      return true;
    }else{
      return false;
    }

  }
}
