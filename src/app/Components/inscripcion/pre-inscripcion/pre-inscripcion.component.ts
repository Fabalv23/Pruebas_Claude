import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/Services/token-storage.service';

import { AuthService } from 'src/Services/auth.service';
import { ApiService } from 'src/Services/api.services';
import { AcademicoService } from 'src/Services/academico.services';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PastoralService } from 'src/Services/pastoral.service';
import { HttpClient } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { ActivatedRoute } from '@angular/router';
import { ReportesService } from 'src/Services/reportes.services';

@Component({
  selector: 'app-pre-inscripcion',
  templateUrl: './pre-inscripcion.component.html',
  styleUrls: ['./pre-inscripcion.component.css']
})
export class PreInscripcionComponent implements OnInit {
  ListadoEstudiantes:any[];
  ListadoEstudiantes1:any[];
  fecha_valida = false;
  constructor(private reportes:ReportesService,private http: HttpClient,private tokenStorage:TokenStorageService,private apiservice:ApiService,private auth:AuthService) {

    


  }

  
  ngOnInit(): void {
    this.auth.RevalSesion();
    var usuid = this.tokenStorage.getUser().usu_id;

    this.apiservice.ObtenerListadoEstudiantesPReinscripcion(usuid)
    .subscribe(result => {
      this.ListadoEstudiantes = result; 
      
      
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


    this.apiservice.ObtenerFechaBtnPreinscripcion().subscribe((data1)=>{
      this.fecha_valida = data1.vigente;
    })

  }

    descargar_boleta(codigo,nombre,grado){
      var data_envio = {estu_codigo:codigo,
              nombre:nombre,
              grado:grado}

            this.reportes.BoletaPagoPre(data_envio).subscribe((data)=>{
        this.reportes.DescargarBoletaPagoPre(data_envio.estu_codigo).subscribe((data2)=>{
          saveAs(data2, 'BoletaPagoPreInscripcion-'+data_envio.estu_codigo+'.pdf');
        })
      })
    }

    descargar(url) {
      // window.location.href=url;
  
      // var extension_file_array = url.toString().split('.');
      var name_array = url.toString().split('/');
  
      var name = name_array[name_array.length - 1];
  
      this.http.get('http://34.138.40.177:9090/' + url, { responseType: "blob" })
        .subscribe(blob => {
          console.log(blob);
          saveAs(blob, name);
        });
  
    }

}
