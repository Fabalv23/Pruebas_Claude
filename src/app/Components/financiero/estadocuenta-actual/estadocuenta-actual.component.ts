import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademicoService } from 'src/Services/academico.services';
import { AuthService } from 'src/Services/auth.service';
import { ReportesService } from 'src/Services/reportes.services';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-estadocuenta-actual',
  templateUrl: './estadocuenta-actual.component.html',
  styleUrls: ['./estadocuenta-actual.component.css']
})
export class EstadocuentaActualComponent implements OnInit {

 
  constructor(private api: AcademicoService, private auth: AuthService, private tokenStorage: TokenStorageService,private route:ActivatedRoute,private api_reportes:ReportesService) { }

  Detalle_General = []

  Detalle_Cargos = []

  Detalle_Abonos = []

  Detalle_Anticipos = []
  nombre:any;
  grado:any;
  spinner = false;

  validardia(valor) {

    try {
      var x = parseFloat(valor)
      if (x == 0 || x < 0) {
        return true
      }
    } catch (error) {
      return false;

    }

    return false;


  }

    validar_anticipo_aplicado(valor) {

    try {
      var x = parseFloat(valor)
      if (x == 0) {
        return true
      }
    } catch (error) {
      return false;

    }

    return false;


  }
  conv_fecha(fecha){
    if(fecha){
      return fecha.substring(0,10)
    }else{
      return ""
    }
  }
  ngOnInit(): void {

      this.auth.RevalSesion();
      var usuid = this.tokenStorage.getUser().usu_id;

      var id_est = this.route.snapshot.paramMap.get('id');

    this.api.ObtenerEstadoCuentaCicloActual(id_est).subscribe(result => {
      this.Detalle_General = (result.detalle).filter(item => item.concepto == 1); 
      this.Detalle_Cargos = (result.cargos).filter(item => item.concepto == 1); 
      this.Detalle_Abonos = (result.abonos).filter(item => item.concepto == 1);  
      this.Detalle_Anticipos = (result.detalle).filter(item => item.concepto != 1);
      console.log(this.Detalle_Anticipos)
      this.nombre = result.nombre;
      this.grado = result.grado + ' "' + result.seccion+'"';
    },
    (error: any) => {
        alert('Error al Obtener Listado de Estudiantes');
        return;
    }); 


  }

  DescargarReporte() {
    this.spinner = true;
    this.api_reportes.ReporteEstudianteSaldos(this.retornarJSONreporte()).subscribe((data) => {
    this.api_reportes.DescargarReporteEstudianteSaldos(this.route.snapshot.paramMap.get('id')).subscribe((data2) => {
        saveAs(data2, 'ReporteEstudianteSaldos'+this.route.snapshot.paramMap.get('id')+'.pdf');
        this.spinner = false;
      }, (error: any) => {
        alert('No se pudo descargar el archivo');
        this.spinner = true;
        return;
      });
    }, (error: any) => {
      alert('No se pudo generar el archivo');
      this.spinner = true;
      return;
    });
}

  retornarJSONreporte() {
    let estudiantes = [];
 
     for (let index = 0; index < this.Detalle_Cargos.length; index++) {
       const fecha = this.Detalle_Cargos[index];
       this.Detalle_Cargos[index].fecha = this.conv_fecha(fecha.fecha)
     }
 
     for (let index = 0; index < this.Detalle_Abonos.length; index++) {
       const fecha = this.Detalle_Abonos[index];
       this.Detalle_Abonos[index].fecha = this.conv_fecha(fecha.fecha)
     }
 
     let fecha = new Date();
 
     let fecha_compuesta = fecha.toLocaleString();
     let docente = this.tokenStorage.getUser().usu_email;
 
 
     var data = {
       id:this.route.snapshot.paramMap.get('id'),
       nombre:this.nombre,
       grado:this.grado,
       saldos: this.Detalle_General,
       cargos: this.Detalle_Cargos,
       abonos:this.Detalle_Abonos,
       usuario:docente,
       fecha:fecha_compuesta
     }
 
     return data;
   }
 


}
