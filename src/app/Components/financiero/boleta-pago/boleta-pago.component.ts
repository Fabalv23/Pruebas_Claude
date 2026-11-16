import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { ModalService } from 'src/Services/modal.services';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-boleta-pago',
  templateUrl: './boleta-pago.component.html',
  styleUrls: ['./boleta-pago.component.css']
})
export class BoletaPagoComponent implements OnInit {


  form_enviar: FormGroup;
  FileUpload: File = null;
  files: File[];
  uploadedFiles: Array<File>;
  ruta = "";
  spinner = false;

  alumno;

  enero = "";
  febrero = "";
  marzo = "";
  abril = "";
  mayo = "";
  junio = "";
  julio = "";
  agosto = "";
  septiembre = "";
  octubre = "";
  noviembre = "";
  diciembre = "";


  comentario_enero = "";
  comentario_febrero = "";
  comentario_marzo = "";
  comentario_abril = "";
  comentario_mayo = "";
  comentario_junio = "";
  comentario_julio = "";
  comentario_agosto = "";
  comentario_septiembre = "";
  comentario_octubre = "";
  comentario_noviembre = "";
  comentario_diciembre = "";

  mes_subir = 0;

  estado_enero = 0;
  estado_febrero = 0;
  estado_marzo = 0;
  estado_abril = 0;
  estado_mayo = 0;
  estado_junio = 0;
  estado_julio = 0;
  estado_agosto = 0;
  estado_septiembre = 0;
  estado_octubre = 0;

  boletas = [];


  async obtenerAlumno(id) {

    await this.apiservice.ObtenerEstudianteCod(id).subscribe(




      (data) => {
        this.alumno = data;
        this.apiservice.ListarBoletasPagoMensual(data.estu_codigo).subscribe(data => {
          this.boletas = data;
          this.asignar_ruta_mes();
        });
      }
    );
  }

  constructor(private modalService: ModalService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder, private http: HttpClient, private apiservice: ApiService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private auth: AuthService) {
    var id_est = this.route.snapshot.paramMap.get('id');

    this.obtenerAlumno(id_est)
    this.form_enviar = this.formBuilder.group({
      Alumno_Boleta: ['', [Validators.required]]
    });


  }

  async fileChange1(element, mes) {
    this.spinner = true;
    //this.mes_subir = mes;
    console.log(mes);
    this.uploadedFiles = element.target.files;
    var ruta = await this.subir_archivo(this.uploadedFiles[0], this.alumno.grad_id, mes, this.alumno.estu_codigo);
    this.apiservice.InsertarBoletaPagoMensual(this.alumno.grad_id, mes, this.alumno.estu_codigo, ruta).subscribe((res) => {
      alert('Boleta de pago adjuntada correctamente');
      //this.asignar_ruta_mes_inmmediato(this.mes_subir, ruta);
      location.reload();
      this.spinner = false;
      return;
    });
    this.spinner = false;



  }

  async subir_archivo(uploadFiles, grado, mes, codigo) {
    const regex = /:/g;
    var formData_archivo = new FormData();
    formData_archivo.append("file", uploadFiles, uploadFiles.name);
    formData_archivo.append('nombre', grado + '-' + mes + '-' + codigo);
    var ruta;
    await this.apiservice.AdjuntarBoletaPagoMensual(formData_archivo).toPromise().then((data) => {
      ruta = data.data;
    });
    return ruta;
  }

  ngOnInit(): void {
    this.form_enviar = this.formBuilder.group({
      Alumno_Boleta: ['', [Validators.required]]
    });
    this.auth.RevalSesion();




  }


  asignar_ruta_mes() {

    for (let index = 0; index < this.boletas.length; index++) {
      const element = this.boletas[index];

      switch (element.mes) {
        case 1:
          this.enero = element.ruta;
          this.estado_enero = element.estado;
          this.comentario_enero = element.comentario;
          break;
        case 2:
          this.febrero = element.ruta;
          this.estado_febrero = element.estado;
          this.comentario_febrero = element.comentario;

          break;
        case 3:
          this.marzo = element.ruta;
          this.estado_marzo = element.estado;
          this.comentario_marzo = element.comentario;

          break;
        case 4:
          this.abril = element.ruta;
          this.estado_abril = element.estado;
          this.comentario_abril = element.comentario;
          break;
        case 5:
          this.mayo = element.ruta;
          this.estado_mayo = element.estado;
          this.comentario_mayo = element.comentario;
          break;
        case 6:
          this.junio = element.ruta;
          this.estado_junio = element.estado;
          this.comentario_junio = element.comentario;

          break;
        case 7:
          this.julio = element.ruta;
          this.estado_julio = element.estado;
          this.comentario_julio = element.comentario;
          break;
        case 8:
          this.agosto = element.ruta;
          this.estado_agosto = element.estado;
          this.comentario_agosto = element.comentario;
          break;
        case 9:
          this.septiembre = element.ruta;
          this.estado_septiembre = element.estado;
          this.comentario_septiembre = element.comentario;
          break;
        case 10:
          this.octubre = element.ruta;
          this.estado_octubre = element.estado;
          this.comentario_octubre = element.comentario;
          break;
      }


    }


  }

  asignar_ruta_mes_inmmediato(mes,ruta) {


      switch (mes) {
        case 1:
          this.enero = ruta;
          break;
        case 2:
          this.febrero = ruta;
          break;
        case 3:
          this.marzo =ruta;
          break;
        case 4:
          this.abril = ruta;
          break;
        case 5:
          this.mayo = ruta;
          break;
        case 6:
          this.junio = ruta;
          break;
        case 7:
          this.julio = ruta;
          break;
        case 8:
          this.agosto = ruta;
          break;
        case 9:
          this.septiembre = ruta;
          break;
        case 10:
          this.octubre = ruta;
          break;
      }


  }

  @ViewChild('modal_1') modal_1: TemplateRef<any>;
  @ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;



  backdrop: any
  showDialog(ruta) {
    this.ruta = ruta;
    console.log(this.ruta)
    let view = this.modal_1.createEmbeddedView(null);
    this.vc.insert(view);
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.remove('fade');
    this.modal_1.elementRef.nativeElement.previousElementSibling.classList.add('modal-open');
    this.modal_1.elementRef.nativeElement.previousElementSibling.style.display = 'block';
    this.backdrop = document.createElement('DIV')
    //this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop)
  }

  closeDialog() {
    this.vc.clear()
    document.body.removeChild(this.backdrop)
  }


}
