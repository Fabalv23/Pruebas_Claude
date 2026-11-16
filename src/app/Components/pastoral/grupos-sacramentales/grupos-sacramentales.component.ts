import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ApiService } from 'src/Services/api.services';
import { AcademicoService } from 'src/Services/academico.services';

import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PastoralService } from 'src/Services/pastoral.service';
import { ReportesService } from 'src/Services/reportes.services';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-grupos-sacramentales',
  templateUrl: './grupos-sacramentales.component.html',
  styleUrls: ['./grupos-sacramentales.component.css']
})
export class GruposSacramentalesComponent implements OnInit {
  ListadoEstudiantes: any[];
  ListadoEstudiantes1: any[];
  Listado_Estudiantes_original: any[];
  ListadoEstudiantes_comunion: any[];
  ListadoEstudiantes_confirmacion: any[];
  ListadoGrupos: any[];
  form_registro: FormGroup;

  grupo_pastoral = 0;
  enviar = 0;

  requisitos;
  comunion = false;
  confirmacion = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private apiservice: ApiService,
    private auth: AuthService,
    private apiacademico: AcademicoService,
    private fb: FormBuilder,
    private apiPastoral: PastoralService,
    private reportes: ReportesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.auth.RevalSesion();
    var usuid = this.tokenStorage.getUser().usu_id;

    this.apiPastoral.ObtenerGrupoPastoralEstudiante(1,usuid).subscribe(
      (result) => {
        this.ListadoEstudiantes1 = result;
      },
      (error: any) => {
        alert('Error al Obtener Listado de Alumnos');
        return;
      }
    );


    this.apiPastoral.ObtenerGrupoPastoralEstudiante(2,usuid).subscribe(
      (result) => {
        this.ListadoEstudiantes_comunion = result;
      },
      (error: any) => {
      }
    );

    this.apiPastoral.ObtenerGrupoPastoralEstudiante(3,usuid).subscribe(
      (result) => {
        this.ListadoEstudiantes_confirmacion = result;
      },
      (error: any) => {
      }
    );

    this.apiacademico.ObtenerListadoEstudiantes(usuid).subscribe(
      (result) => {
        this.ListadoEstudiantes = result;
        this.Listado_Estudiantes_original = result;
      },
      (error: any) => {
        alert('Error al Obtener Listado de Alumnos');
        return;
      }
    );


    this.apiPastoral.ObtenerGrupoPastoral(1).subscribe(
      (result) => {
        this.ListadoGrupos = result;
      },
      (error: any) => {
        alert('Error al Obtener Grupos Pastorales');
        return;
      }
    );
  }

  PresentarRegistro(val) {

    if (this.enviar == 0) {
      this.enviar = 1;

      var inscripcion: any = {
        codigo: this.form_registro.controls['codigo'].value,
        categoria: `${val}`
      };

     this.apiPastoral.InsertarEstudianteGrupoPastoral(inscripcion).subscribe(
        (data) => {
          alert(data.mensaje);
          location.reload();
        },
        (err) => {
          alert('Algo salió mal');
          location.reload();
          console.log(err);
        }
      );
    }


  }

  change(val) {
    this.grupo_pastoral = val;
  }

  @ViewChild('modal_1') modal_1: TemplateRef<any>;

  @ViewChild('modal_2') modal_2: TemplateRef<any>;

  @ViewChild('modal_requisitos') modal_requisitos: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

  backdrop: any;
  showDialog() {

    var new_list_estudiantes = [];

    for (let index = 0; index < this.Listado_Estudiantes_original.length; index++) {
      const element = this.Listado_Estudiantes_original[index];
      
      if(this.ListadoEstudiantes_confirmacion.filter(x => x.codigo == element.codigo).length == 0 && this.ListadoEstudiantes_comunion.filter(x => x.codigo == element.codigo).length == 0 && this.ListadoEstudiantes1.filter(x => x.codigo == element.codigo).length == 0){
        new_list_estudiantes.push(element);
      }

    }

    this.ListadoEstudiantes = new_list_estudiantes;


    let view = this.modal_1.createEmbeddedView(null);
    this.vc.insert(view);
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.remove(
      'fade'
    );
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.add(
      'modal-open'
    );
    this.modal_1.elementRef.nativeElement.previousElementSibling.style.display =
      'block';
    this.backdrop = document.createElement('DIV');

    this.form_registro = this.fb.group({
      codigo: ['', [Validators.required]],
      grupo: ['', [Validators.required]]
    });
    //this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop);
  }

  showDialogConfirmacion() {
    var new_list_estudiantes = [];

    for (let index = 0; index < this.Listado_Estudiantes_original.length; index++) {
      const element = this.Listado_Estudiantes_original[index];
      
      if(this.ListadoEstudiantes_confirmacion.filter(x => x.codigo == element.codigo).length == 0 && this.ListadoEstudiantes_comunion.filter(x => x.codigo == element.codigo).length == 0 && this.ListadoEstudiantes1.filter(x => x.codigo == element.codigo).length == 0){
        new_list_estudiantes.push(element);
      }

    }

    this.ListadoEstudiantes = new_list_estudiantes;
    let view = this.modal_2.createEmbeddedView(null);
    this.vc.insert(view);
    this.modal_2.elementRef.nativeElement.previousElementSibling.classList.remove(
      'fade'
    );
    this.modal_2.elementRef.nativeElement.previousElementSibling.classList.add(
      'modal-open'
    );
    this.modal_2.elementRef.nativeElement.previousElementSibling.style.display =
      'block';
    this.backdrop = document.createElement('DIV');

    this.form_registro = this.fb.group({
      codigo: ['', [Validators.required]],
      grupo: ['', [Validators.required]]
    });
    //this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop);
  }

  showRequisitos(tipo) {
    let view = this.modal_requisitos.createEmbeddedView(null);
    this.vc.insert(view);
    this.modal_requisitos.elementRef.nativeElement.previousElementSibling.classList.remove(
      'fade'
    );
    this.modal_requisitos.elementRef.nativeElement.previousElementSibling.classList.add(
      'modal-open'
    );
    this.modal_requisitos.elementRef.nativeElement.previousElementSibling.style.display =
      'block';
    this.backdrop = document.createElement('DIV');

    switch(tipo){
      case 1:

      this.confirmacion = false;
      this.comunion = true;

      break;

      case 2:
        this.confirmacion = true;
        this.comunion = false;

      break;
    }


    //this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop);
  }

  closeDialog() {
    this.vc.clear();
    document.body.removeChild(this.backdrop);
  }

  Eliminar(id, tipo) {
    this.apiPastoral.EliminarGrupoPastoralEstudiante(id, tipo).subscribe(
      (resultado) => {
        location.reload();
      },
      (err) => {
        alert(err.error.mensaje);
        location.reload();
      }
    );
  }



  estado(val){
    switch(val){

      case 1:
        return "INGRESADO"
      break;

      case 2:
        return "AUTORIZADO"
      break;

      case 3:
        return "RECHAZADO"
      break;

      case 4:
        return "ELIMINADO"
      break;
    }
  }


   
 descargar_comunion(codigo){

  this.apiPastoral.Constancia(codigo).subscribe((data)=>{


      this.reportes.ConstanciaInscripcionPastoralComunion(data).subscribe((data)=>{
        this.reportes.DescargarConstanciaInscripcionPastoralComunion(codigo).subscribe((data2)=>{
          saveAs(data2, 'ConstanciaInscripciónComunion-'+codigo+'.pdf');
        })
      })
  })


 }


 descargar_confirmacion(codigo){

  this.apiPastoral.Constancia(codigo).subscribe((data)=>{


      this.reportes.ConstanciaInscripcionPastoralConfirmacion(data).subscribe((data)=>{
        this.reportes.DescargarConstanciaInscripcionPastoralConfirmacion(codigo).subscribe((data2)=>{
          saveAs(data2, 'ConstanciaInscripciónConfirmacion-'+codigo+'.pdf');
        })
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
