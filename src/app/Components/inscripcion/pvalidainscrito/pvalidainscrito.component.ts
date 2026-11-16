import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-pvalidainscrito',
  templateUrl: './pvalidainscrito.component.html',
  styleUrls: ['./pvalidainscrito.component.css']
})
export class PvalidainscritoComponent implements OnInit {


  form_val: FormGroup;

  public mask_cod = [/\d/,/\d/,'-',/([A-ZÁÉÍÓÚÑ]|[a-záéíóú\'])/,'-',/\d/,/\d/,/\d/,/\d/];

  constructor(private router:Router,public fb: FormBuilder,private apiservice: ApiService,private auth:AuthService) {

    this.form_val = this.fb.group({
      Alumno_Codigo : ['',[Validators.required,Validators.pattern(/[\d/][\d/][-]([A-ZÁÉÍÓÚÑ]|[a-záéíóú\'])[-][/\d/][/\d/][/\d/][/\d/]$/)]]

     })


   }


   get valores(){return this.form_val.value}


   error=false;

   Validar(){

    this.apiservice.ObtenerAlumnoCod(this.valores.Alumno_Codigo).subscribe(data => {
      this.router.navigate(['inscripcion/InscripcionNuevo', data.alumno_id]);
      //this.router.navigate(['./InscripcionNuevo',data.alumno_id]);
    },
    (error: any) => {
        this.error = true;
      //alert('Alumno inexistente o sin resultados de admisión, por favor comunicarse al colegio para mas información');
      return;
  });  

   }

  Cancelar(){
      this.router.navigateByUrl('/Usuario/Home');
  }

  ngOnInit(): void {

    this.auth.RevalSesion();

  }

}
