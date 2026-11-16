import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/Services/modal.services'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from 'src/Services/api.services'
import { usuario } from 'src/models/usuarios';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { mSexo } from 'src/models/mSexo';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { AuthService } from 'src/Services/auth.service';
import { mAlumno } from 'src/models/mAlumno';
import { mNacionalidad } from 'src/models/mNacionalidad';
import { mDepartamento } from 'src/models/mDepartamento';
import { mMunicipio } from 'src/models/mMunicipios';
import { mReligion } from 'src/models/mReligion';
import { mGrado } from 'src/models/mGrado';
import { Jornada } from 'src/models/Jornada';
import { of } from 'rxjs';
@Component({
  selector: 'app-crudver',
  templateUrl: './crudver.component.html',
  styleUrls: ['./crudver.component.css']
})
export class CRUDVerComponent implements OnInit {

  alumno:mAlumno;

  //formulario
  form_editar: FormGroup;
  form_nuevo: FormGroup;
  sexos: mSexo[];
  nacionalidades: mNacionalidad[];
  departamentos: mDepartamento[];
  municipios: mMunicipio[];
  religiones: mReligion[];
  grados: mGrado[];
  orders = [];
  jornadas: Jornada[];
  FileUpload: File = null;
  files: File[];
  uploadedFiles: Array < File > ;


  //globales
  editable = false;
  calc_edad;
  calc_edad1;
  defaultValue;
  private subscriber: any;
  AnioReadOnly = true;
  GradosHermanos = true;
  AlumnoPFExalumno = true;
  ArrayGrados = [];
  GradosString="";
  FotoFicha;
  Alumno_NuevoCodigo = "";
  Info_Codigo;
  grado_disabled;
  ImagenResource;


      ///mascaras de campos
      public mask_fechanacimiento =  [ /\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/];
      public mask_tel = [/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/];
    

  async obtenerAlumno(id){
           
    await this.apiservice.ObtenerAlumno(id).subscribe(

          (data) => {
              this.alumno = data;
              this.GradosString = this.alumno.alumno_grados;
              this.calc_edad1 = this.alumno.edad;
              this.ObtenerFoto(this.alumno.imagen);
              this.form_editar = this.fb.group({  
                Alumno_Codigo : [this.alumno.alumno_codigo],
                Alumno_PrimerNombre: [this.alumno.alumno_primernombre,[Validators.required,Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
                Alumno_SegundoNombre: [this.alumno.alumno_segundonombre, [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
                Alumno_TecerNombre: [this.alumno.alumno_tecernombre,[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
                Alumno_PrimerApellido: [this.alumno.alumno_primerapellido,[Validators.required,Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
                Alumno_SegundoApellido: [this.alumno.alumno_segundoapellido,[Validators.required,Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
                sexos:[this.alumno.alumno_sexo,[Validators.required]],   
                fecha_nacimiento: [this.alumno.fecha_nacimiento, [Validators.required,Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)]],
                edad1:[this.calc_edad1,[Validators.required]],
                nacionalidades:[this.alumno.nac_id,[Validators.required]], 
                departamentos:[this.alumno.depto_id,[Validators.required]],  
                municipios:[this.alumno.muni_id,[Validators.required]],
                religiones:[this.alumno.rel_id,[Validators.required]],
                iglesia_asist:[this.alumno.iglesia_asist],
                Centro_proviene:[this.alumno.centro_proviene],
                Centro_ubicacion:[this.alumno.centro_ubicacion],
                grados:[this.alumno.grad_id,[Validators.required]],
                Est_antes:[this.alumno.est_antes],
                anio:[this.alumno.anio],
                mot:[this.alumno.mot_retiro],
                Alumno_TieneHermanos:[this.alumno.alumno_tienehermanos],
                Alumno_Grados:[this.GradosString],
                Alumno_NombrePadre:[this.alumno.alumno_nombrepadre,[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
                Alumno_ApellidoPadre:[this.alumno.alumno_apellidopadre,[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
                Alumno_ProfesionPadre:[this.alumno.alumno_profesionpadre],
                Alumno_TelefonoPadre:[this.alumno.alumno_telefonopadre,[Validators.pattern(/(\d{4}(-)\d{4})$/)]],
                Alumno_NombreMadre:[this.alumno.alumno_nombremadre,[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
                Alumno_ApellidoMadre:[this.alumno.alumno_apellidomadre,[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
                Alumno_ProfesionMadre:[this.alumno.alumno_profesionmadre],
                Alumno_TelefonoMadre:[this.alumno.alumno_telefonomadre,[Validators.pattern(/(\d{4}(-)\d{4})$/)]],
                Alumno_Direc:[this.alumno.alumno_direc],
                Alumno_Telefono:[this.alumno.alumno_telefono,[Validators.pattern(/(\d{4}(-)\d{4})$/)]],
                Alumno_foto:[this.alumno.imagen],
                Alumno_PFExalumno:[this.alumno.alumno_pfexalumno]
                /*name: ['', [Validators.required]],
                company: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
                email: ['', [Validators.required, Validators.email]],
                age: ['', [Validators.required]],
                
                password: ['', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],*/
              });
              

             
          }
    );
   

    //5555console.log(this.alumno);

  }


  //Obtener FOTO
async ObtenerFoto(Pic){

 

    this.subscriber = await this.route.params.subscribe(params => {	             
      this.apiservice.ObtenerFoto(Pic).subscribe((res)=> {    
         
        this.MostrarFoto(res.body);
    
    });       
    });
  
    
    
  
}

MostrarFoto(Foto){
  this.ImagenResource ='data:image/jpeg;base64,'+ Foto;
}

  constructor(private modalService: ModalService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder, private http: HttpClient, private apiservice: ApiService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder,private auth: AuthService) {

      //obtener el parametro

      var id_est = this.route.snapshot.paramMap.get('id');

      
       this.obtenerAlumno(id_est);
        


       
      //obtener selects de la DB
      this.subscriber = this.route.params.subscribe(params => {	             
        this.apiservice.getSexo().subscribe((data:mSexo[]) => {                                          
         this.sexos = data;
         });                   
     });
     this.subscriber = this.route.params.subscribe(params => {	             
      this.apiservice.getNacionalidad().subscribe((data:mNacionalidad[]) => {                                          
        this.nacionalidades = data;
        });        
   });
   this.subscriber = this.route.params.subscribe(params => {	             
    this.apiservice.getDepartamentos().subscribe((data:mDepartamento[]) => {                                          
      this.departamentos = data;
      });        
 });

 this.subscriber = this.route.params.subscribe(params => {	             
  this.apiservice.getMunicipios().subscribe((data:mMunicipio[]) => {                                          
    this.municipios = data;
    });        
});

this.subscriber = this.route.params.subscribe(params => {	             
  this.apiservice.getReligion().subscribe((data:mReligion[]) => {                                          
    this.religiones = data;
    });        
});

this.subscriber = this.route.params.subscribe(params => {	             
  this.apiservice.getGrados().subscribe((data:mGrado[]) => {                                          
    this.grados = data;    
    });        
});


      this.form_editar = this.formBuilder.group({
        sexos: [''],
        nacionalidades:[''],
        departamentos:[''],
        municipios:[''],
        religiones:[''],
        grados:['']
      });
    

// async selects
of(this.getSexo()).subscribe(sexos => {
  this.sexos = sexos;
  this.form_editar.controls.sexos.patchValue(this.sexos[0].id_sexo);
  this.form_nuevo.controls.sexos.patchValue(this.sexos[0].id_sexo);
  
});

of(this.getNac()).subscribe(nacionalidad => {
  this.nacionalidades = nacionalidad;
  this.form_editar.controls.nacionalidades.patchValue(this.nacionalidades[0].nac_id);
  this.form_nuevo.controls.nacionalidades.patchValue(this.nacionalidades[0].nac_id);
  
});
of(this.getDepartamento()).subscribe(dep => {
  this.departamentos = dep;
  this.form_editar.controls.departamentos.patchValue(this.departamentos[0].dep_id);
  this.form_nuevo.controls.departamentos.patchValue(this.departamentos[0].dep_id);
  
});
of(this.getMunis()).subscribe(dep => {
  this.municipios = dep;
  this.form_editar.controls.municipios.patchValue(this.municipios[0].muni_id);
  this.form_nuevo.controls.municipios.patchValue(this.municipios[0].muni_id);
  
});

of(this.getReligion()).subscribe(dep => {
  this.religiones = dep;
  this.form_editar.controls.religiones.patchValue(this.religiones[0].rel_id);
  this.form_nuevo.controls.religiones.patchValue(this.religiones[0].rel_id);
  
});

of(this.getGrados()).subscribe(dep => {
  this.grados = dep;
  this.form_editar.controls.grados.patchValue(this.grados[0].grad_id);
  this.form_nuevo.controls.grados.patchValue(this.grados[0].grad_id);
  
});



} 
 //obtener var con los listados
 getSexo() {    
  return this.sexos;
}

getNac() {    
  return this.nacionalidades;
}
getDepartamento() {    
  return this.departamentos;
}
getMunis() {    
  return this.municipios;
}

getReligion() {    
  return this.religiones;
}

getGrados() {    
  return this.grados;
}


//  /[1-9]/

  


  ngOnInit(): void {

    this.auth.RevalSesion();
    
    this.form_editar.disable() 

  }

}
