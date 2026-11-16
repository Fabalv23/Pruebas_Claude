import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Jornada } from 'src/models/Jornada';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/Services/api.services';



import { ModalService } from 'src/Services/modal.services';


import { usuario } from 'src/models/usuarios';
import { mSexo } from 'src/models/mSexo';
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
  
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  NoCuenta = "";

  jornadas: Jornada[];





  	private subscriber: any;

    form_crear: FormGroup;

  constructor(private http: HttpClient,private apiservice: ApiService,private route: ActivatedRoute,public fb: FormBuilder) { 
   


    this.form_crear = this.fb.group({
      Nombre_Usuario:['',[Validators.required]],
      Apellido_Usuario: ['', [Validators.required]],
      Correo: ['',[Validators.required]],
      Password: ['',[Validators.minLength(6),Validators.required]],
      Cod: ['', [Validators.required]],
      jornadas: ['', [Validators.required]],
      
    });
    
  }

get Valores(){return this.form_crear.controls}

codval=false;
ValidarCodigo(cod){

  this.subscriber = this.route.params.subscribe(params => {	             
    this.apiservice.ValCodigo(cod).subscribe((data) => {                                                                         
      this.codval = false;
      document.getElementById('Cod').style.borderColor='gray';
      },
      (error: any) => {
        this.codval = true;
         document.getElementById('Cod').focus();
         document.getElementById('Cod').style.borderColor='red';
          return;
      });  
  });


}

valcorreo = true;
ValidarCorreo(cod){

  
  
  this.subscriber = this.route.params.subscribe(params => {	             
    this.apiservice.ValCorreo(cod).subscribe((data) => {                                                                         
      this.valcorreo = true;
      document.getElementById('correo').style.borderColor='gray';
      },
      (error: any) => {
        this.valcorreo = false;
         document.getElementById('correo').focus();
         document.getElementById('correo').style.borderColor='red';
          
      });  
  });

}


cuenta = false;
enviado = 0;
Enviar(){
if(this.enviado==0){
  this.enviado=1;
  this.apiservice.CrearCuenta(JSON.stringify(this.form_crear.value)).subscribe((data) =>{      
      this.NoCuenta = data.body.cuenta.cuenta;
      this.cuenta = true;
  },
      (error: any) => {  
        alert('Revisar con atención los datos ingresados');            
          return;
      });  
}
}


ValPassword(dato){


  if(dato == this.Valores.Password.value){
    
    document.getElementById('valpass').style.borderColor='gray';
  }else{
    document.getElementById('valpass').focus();
    document.getElementById('valpass').style.borderColor='red';
    return;
  }



}

  ngOnInit(): void {
    this.subscriber = this.route.params.subscribe(params => {	             
      this.apiservice.getJornadas().subscribe((data:Jornada[]) => {                                
        
       this.jornadas = data;
        
        

       });     
   });


  }

}
