import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { ConvivenciaService } from 'src/Services/convivencia.service';
import { Observable, Subject } from 'rxjs';
import { first, tap } from 'rxjs/operators';

export interface Excusas {
  letra: string;
  fecha_ausencia: string;
  fecha_ausencia_fin: string;
  fecha_ingreso: string;
  descripcion: string;
  estado: string;
  periodo: string;
  adjunto: string;
  adjunto1: string;
  adjunto2: string;
  tipo: number;
  id: number;
}

@Component({
  selector: 'app-administrar-excusa',
  templateUrl: './administrar-excusa.component.html',
  styleUrls: ['./administrar-excusa.component.css']
})
export class AdministrarExcusaComponent implements OnInit {

  Listado_Periodos = [];
  Listado_Clase_Excusas = [];
  Listado_TipoExcusa = [];
  Listado_TipoExusa_Filtrado = [];
  excusas: Excusas[] = [];
  spinner = false
  fecha_minima = '-01-01';
  fecha_maxima = '-12-31';


  constructor(private route: ActivatedRoute, private http: HttpClient, private auth: AuthService,
    private tokenstorage: TokenStorageService, private apiservice: ApiService, private router: Router,
    private fb: FormBuilder, private apiConvivencia: ConvivenciaService) {

    var codigo_alumno = this.route.snapshot.paramMap.get('codigo');

    this.fecha_minima = new Date().getFullYear() + this.fecha_minima;

    this.fecha_maxima = new Date().getFullYear() + this.fecha_maxima;

    this.apiConvivencia.ObtenerExcusasEstudiantes(codigo_alumno).subscribe((data) => {
      this.excusas = data;
      this.excusas = this.excusas.sort((a, b) => new Date(b.fecha_ingreso).getTime() - new Date(a.fecha_ingreso).getTime());

    })


    this.apiConvivencia.ObtenerPeriodos().subscribe(data => {
      this.Listado_Periodos = data;
    })

    this.apiConvivencia.ObtenerClaseExcusa().subscribe(data => {
      this.Listado_Clase_Excusas = data;
    })

    this.apiConvivencia.ObtenerTipoExcusa().subscribe(data => {
      this.Listado_TipoExcusa = data;
    })




  }


  form_excusa: FormGroup;
  form_cambiar1: FormGroup;
  enviar = 0;
  fecha_actual;
  uploadedFiles: Array<File> = [];
  uploadedFiles2: Array<File> = [];
  uploadedFiles3: Array<File> = [];

  //Rutas
  ruta1 = null;
  ruta2 = null;
  ruta3 = null;

  //Globales
  codigo_alumno;
  descripcion_longitud = false;

  @ViewChild('modal_1') modal_1: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

  backdrop: any
  showDialog() {
    let view = this.modal_1.createEmbeddedView(null);
    this.vc.insert(view);
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
    this.modal_1.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.backdrop = document.createElement('DIV')

    var codigo_alumno = this.route.snapshot.paramMap.get('codigo');

    this.form_excusa = this.fb.group({
      codigo: [codigo_alumno, [Validators.required]],
      fecha_ausencia: ['', [Validators.required]],
      fecha_actual: [this.fecha_actual, [Validators.required]],
      periodos: [''],
      clase_excusa: ['', [Validators.required]],
      tipo_excusa: ['', [Validators.required]],
      adjunto: [],
      adjunto1: [],
      adjunto2: [],
      descripcion: ['', [Validators.required]],
    })
    //this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop)
  }

  closeDialog() {
    this.vc.clear()
    document.body.removeChild(this.backdrop)
  }


  @ViewChild('modal_2') modal_2: TemplateRef<any>;
  showDialog1() {
    let view = this.modal_2.createEmbeddedView(null);
    this.vc.insert(view);
    this.modal_2.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.modal_2.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
    this.modal_2.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.backdrop = document.createElement('DIV')

    var codigo_alumno = this.route.snapshot.paramMap.get('codigo');

    this.form_excusa = this.fb.group({
      codigo: [codigo_alumno, [Validators.required]],
      fecha_ausencia_inicio: ['', [Validators.required]],
      fecha_ausencia_fin: ['', [Validators.required]],
      fecha_actual: [this.fecha_actual, [Validators.required]],
      clase_excusa: ['', [Validators.required]],
      tipo_excusa: ['', [Validators.required]],
      adjunto: [],
      adjunto1: [],
      adjunto2: [],
      descripcion: ['', [Validators.required]],
    })
    //this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop)
  }

  closeDialog1() {
    this.vc.clear()
    document.body.removeChild(this.backdrop)
  }

  excusas_Filtrada = [];

  tipo_excusas = [];
  tipo_excusas_Filtrada = [];
  //Fitlrado

  Inicio = true;
  Filtrado_Id = false;





  Eliminar(id, tipo) {

    this.apiConvivencia.AnularExcusaIndividual(id, tipo).subscribe(resultado => {
      this.spinner = true
      location.reload();
    }, error => { alert('Algo salió mal'); location.reload(); })



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

  async PresentarExcusa(tipo) {
    const regex = /:/g;
    var ruta_excusa_adjunto = "";

    if (this.enviar == 0) {
      this.spinner = true
      this.enviar = 1;
      var formData1 = new FormData();
      var formData_archivo = new FormData();
      this.codigo_alumno = this.form_excusa.controls.codigo.value;

      switch (tipo) {
        case 1:
          formData1.append('periodos', this.form_excusa.controls.periodos.value);
          formData1.append('fecha_ausencia', this.form_excusa.controls.fecha_ausencia.value);
          break;
        case 2:
          formData1.append('fecha_ausencia_inicio', this.form_excusa.controls.fecha_ausencia_inicio.value);
          formData1.append('fecha_ausencia_fin', this.form_excusa.controls.fecha_ausencia_fin.value);
          break;
      }

      formData1.append('tipo', tipo);
      formData1.append('codigo', this.form_excusa.controls.codigo.value);
      formData1.append('fecha_actual', this.form_excusa.controls.fecha_actual.value);
      formData1.append('descripcion', this.form_excusa.controls.descripcion.value);
      formData1.append('clase_excusa', this.form_excusa.controls.clase_excusa.value);
      formData1.append('tipo_excusa', this.form_excusa.controls.tipo_excusa.value);
      if (this.uploadedFiles.length > 0) {
        this.ruta1 = await this.subir_archivo(this.uploadedFiles[0], 'adjunto1');
        formData1.append('url_archivo', this.ruta1);
        if (this.uploadedFiles2.length > 0) {
          this.ruta2 = await this.subir_archivo(this.uploadedFiles2[0], 'adjunto2');

        }
        formData1.append('url_archivo2', this.ruta2);

        if (this.uploadedFiles3.length > 0) {
          this.ruta3 = await this.subir_archivo(this.uploadedFiles3[0], 'adjunto3');
        }
        formData1.append('url_archivo3', this.ruta3);
        await this.apiConvivencia.InsertarExcusaIndividual(formData1).subscribe(resultado => {
         location.reload();
        }, error => { alert('Algo salió mal'); location.reload(); })


      } else {
        formData1.append('url_archivo', null);
        formData1.append('url_archivo2', null);
        formData1.append('url_archivo3', null);

        await this.apiConvivencia.InsertarExcusaIndividual(formData1).subscribe(resultado => {
          this.spinner = true;
          location.reload();
        }, error => { alert('Algo salió mal'); location.reload(); })
      }
    }

  }

  ngOnInit(): void {
    this.auth.RevalSesion();
    this.ObtenerFecha();

  }


  async subir_archivo(uploadFiles, nombre_adjunto) {
    const regex = /:/g;
    var formData_archivo = new FormData();
    formData_archivo.append("file", uploadFiles, uploadFiles.name);
    formData_archivo.append('nombre', this.codigo_alumno + '-' + this.fecha_actual.toString().replace(regex, '') + '-' + nombre_adjunto);
    var ruta;
    await this.apiConvivencia.AdjuntarArchivoExcusa(formData_archivo).toPromise().then((data) => {
      ruta = data.data;
    });
    return ruta;
  }

  Periodos_Ausente = [];
  juntar(data, check) {
    if (check) {
      this.Periodos_Ausente.push(data);
    } else {
      let index = this.Periodos_Ausente.findIndex(x => x.value == data);
      this.Periodos_Ausente.splice(index, 1);
    }
    this.form_excusa.controls.periodos.setValue(this.Periodos_Ausente.join(","));
  }

  TipoExcusa(id) {

    var letra = this.Listado_Clase_Excusas.filter(x => x.id == id)[0].letra
    var hora = this.fecha_actual.substring(11, this.fecha_actual.length)

    if(letra=="B"){
      if (hora > "08:00" && hora < "13:30") {
      //  if (hora > "21:00" && hora < "22:30") {
        alert('Este tipo de excusa se permite realizar únicamente antes de las 8 de la mañana');
        location.reload();
      }else{
        this.Listado_TipoExusa_Filtrado = this.Listado_TipoExcusa.filter(x => x.letra == letra);
      }
    }else{
      this.Listado_TipoExusa_Filtrado = this.Listado_TipoExcusa.filter(x => x.letra == letra);
    }
  }

  validar_len(val){
    
    var longitud = val.split(" ");
    if(longitud){
    if(longitud.length<8){
      //alert('Descripción debe contener 8 palabras como mínimo');
      //return;
      this.descripcion_longitud = false;
    }else{
      this.descripcion_longitud = true
    }
    }else{
      //alert('Descripción debe contener 8 palabras como mínimo');
      //return;
    }
  }

  ObtenerFecha() {

    var fecha = new Date();

    var mes = (fecha.getMonth() + 1).toString();

    if (parseInt(mes) < 10) {
      mes = '0' + mes;
    }

    var dia = fecha.getDate().toString();

    if (parseInt(dia) < 10) {
      dia = '0' + dia;
    }

    var hora = fecha.getHours().toString();


    if (parseInt(hora) < 10) {
      hora = '0' + hora;
    }


    var minutos = fecha.getMinutes().toString();

    if (parseInt(minutos) < 10) {
      minutos = '0' + minutos;
    }

    this.fecha_actual = fecha.getFullYear() + '-' + mes + '-' + dia + ' ' + hora + ':' + minutos;

  }

  @ViewChild('archivo_adjunto') archivo_adjunto: ElementRef;

  @ViewChild('archivo_adjunto1') archivo_adjunto2: ElementRef;

  @ViewChild('archivo_adjunto2') archivo_adjunto3: ElementRef;
  fileChange1(element) {
    //console.log(element.target.files)
    if (element.target.files[0].size > 5000000) {
      this.uploadedFiles = [];
      this.archivo_adjunto.nativeElement.value = '';
      alert('Archivo sobrepasa los 5MB');
      return;
    } else {
      this.uploadedFiles = [];
      this.uploadedFiles.push(element.target.files[0])
    }
  }

  fileChange2(element) {
    // console.log(element.target.files)
    //this.uploadedFiles2 = element.target.files;
    if (element.target.files[0].size > 5000000) {
      this.uploadedFiles2 = [];
      this.archivo_adjunto2.nativeElement.value = '';
      alert('Archivo sobrepasa los 5MB');
      return;
    } else {
      this.uploadedFiles2 = [];
      this.uploadedFiles2.push(element.target.files[0])
    }
  }

  fileChange3(element) {
    // console.log(element.target.files)
    if (element.target.files[0].size > 5000000) {
      this.uploadedFiles3 = [];
      this.archivo_adjunto3.nativeElement.value = '';
      alert('Archivo sobrepasa los 5MB');
      return;
    } else {
      this.uploadedFiles3 = [];
      this.uploadedFiles3.push(element.target.files[0])
    }
  }

  download(url) {
    // window.location.href=url;

    // var extension_file_array = url.toString().split('.');
    var name_array = url.toString().split('/');

    var name = name_array[name_array.length - 1];

    this.http.get('http://34.29.192.98:9090/' + url, { responseType: "blob" })
      .subscribe(blob => {
        console.log(blob);
        saveAs(blob, name);
      });

  }

  validarURL(url) {
    if (url && url != "null") {
      return true
    }
    return false
  }


}
