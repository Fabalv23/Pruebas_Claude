import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/Services/api.services';
import { mGrado } from 'src/models/mGrado';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-cpre-inscripcion',
  templateUrl: './cpre-inscripcion.component.html',
  styleUrls: ['./cpre-inscripcion.component.css']
})
export class CPreInscripcionComponent implements OnInit {

  form_inscripcion:FormGroup;
  grados:mGrado[];
  grados_futuro:mGrado[];
  alumno:any;
  enviado = 1;
  async obtenerAlumno(id) {

    await this.apiservice.ObtenerEstudianteCod(id).subscribe(
      (data) => {
        this.alumno = data;
        let nuevo_grado;
        if(this.alumno.grad_id!=12){
            nuevo_grado = this.alumno.grad_id+1
        }

        this.form_inscripcion = this.fb.group({
          Estu_Codigo:[this.alumno.estu_codigo],
          grados:[this.alumno.grad_id],
          grados_futuro:[nuevo_grado,[Validators.required]],
          Estu_PrimerApellido:[this.alumno.estu_primerapellido],
          Estu_SegundoApellido:[this.alumno.estu_segundoapellido],
          Estu_PrimerNombre:[this.alumno.estu_primernombre],
          Estu_SegundoNombre:[this.alumno.estu_segundonombre],
          Estu_TercerNombre:[this.alumno.estu_tercernombre],
          modalidad:[1,[Validators.required]]
        })



      }
    );
  }

  constructor(private auth:AuthService, private apiservice:ApiService,private fb:FormBuilder,private route:ActivatedRoute,private router:Router ) {

    var id_est = this.route.snapshot.paramMap.get('id');

    this.obtenerAlumno(id_est);


   }


  enviar(){
    if(this.enviado==1){
      this.enviado = 0;
    this.apiservice.InsertarEstudiantesPReinscripcion(JSON.stringify(this.form_inscripcion.value)).subscribe((data)=>{
      alert(data)
      this.router.navigateByUrl('/inscripcion/PreInscripcion');
      return;




    })

  }
  }

  ngOnInit(): void {
    this.auth.RevalSesion();
      this.form_inscripcion = this.fb.group({
        Estu_Codigo:[''],
        grados:['1'],
        grados_futuro:['1',[Validators.required]],
        Estu_PrimerApellido:[''],
        Estu_SegundoApellido:[''],
        Estu_PrimerNombre:[''],
        Estu_SegundoNombre:[''],
        Estu_TercerNombre:[''],
        modalidad:[1,[Validators.required]]

      })



      this.apiservice.getGrados().subscribe((data: mGrado[]) => {
        this.grados = data;
        this.grados_futuro = data;
      });


  }

}
