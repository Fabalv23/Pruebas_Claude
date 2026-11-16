import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/Services/modal.services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/Services/api.services'
import { usuario } from 'src/models/usuarios';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { mSexo } from 'src/models/mSexo';
import { Jornada } from 'src/models/Jornada';
import { of } from 'rxjs';
import { mNacionalidad } from 'src/models/mNacionalidad';
import { mDepartamento } from 'src/models/mDepartamento';
import { mMunicipio } from 'src/models/mMunicipios';
import { mReligion } from 'src/models/mReligion';
import { mGrado } from 'src/models/mGrado';
import { pathToFileURL } from 'url';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { AuthService } from 'src/Services/auth.service';
import { mCodigo } from 'src/models/mCodigo';
import { async } from '@angular/core/testing';
import { __await } from 'tslib';
import { mAlumno } from 'src/models/mAlumno';

@Component({
  selector: 'app-subirboleta',
  templateUrl: './subirboleta.component.html',
  styleUrls: ['./subirboleta.component.css']
})
export class SubirboletaComponent implements OnInit {


  form_enviar: FormGroup;
  FileUpload: File = null;
  files: File[];
  uploadedFiles: Array < File > ;

  alumno;

  async obtenerAlumno(id) {

    await this.apiservice.ObtenerEstudianteCod(id).subscribe(




      (data) => {
        this.alumno = data;      
        
      }
    );
  }
  
  constructor(private modalService: ModalService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder, private http: HttpClient, private apiservice: ApiService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder,private auth: AuthService) {
      var id_est = this.route.snapshot.paramMap.get('id');

      this.obtenerAlumno(id_est)
      this.form_enviar = this.formBuilder.group({
        Alumno_Boleta:['',[Validators.required]]    
      });
 
 
    }

    fileChange(element) {
      this.uploadedFiles = element.target.files;
    }


    Enviar(){
   
      //alert(this.alumno.estu_codigo)
      var usuid = this.tokenStorage.getUser().usu_id;
      
      
      let formData1 = new FormData();
        
      
    
      if(this.uploadedFiles != undefined){
        for (var i = 0; i < this.uploadedFiles.length; i++) {
          formData1.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
        }
      }     
      formData1.append("codigo",this.alumno.estu_codigo)
    
      if(this.uploadedFiles != undefined){
        
    
        this.apiservice.IngresoBoleta(formData1).subscribe((res)=> {  
          alert('Su boleta ha sido registrada, en el transcurso de 72 horas será procesada su solicitud')  
          this.router.navigateByUrl('inscripcion/Index');
        });
      } 
    
      
    
    
     }

  ngOnInit(): void {
    this.form_enviar = this.formBuilder.group({
      Alumno_Boleta:['',[Validators.required]]    
    });
    this.auth.RevalSesion();

  }

}
