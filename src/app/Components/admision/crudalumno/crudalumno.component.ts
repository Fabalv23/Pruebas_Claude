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

declare var pdfMake: any;

@Component({
  selector: 'app-crudalumno',
  templateUrl: './crudalumno.component.html',
  styleUrls: ['./crudalumno.component.css']
})
export class CRUDAlumnoComponent implements OnInit {

  //alumno id
  alumno:mAlumno;
  id_alumno;

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
  //json
/*  alumno = {
    Alumno_PrimerNombre: "Erick", Alumno_Codigo: "20-AAAA", Alumno_SegundoNombre: "Fabian", Alumno_TecerNombre: "",
    Alumno_PrimerApellido: "Alvarez", Alumno_SegundoApellido: "Franco", TipSex_Id: 1,fecha_nacimiento:"23/03/1999",edad:21
  };*/



    //  /[1-9]/

    ///mascaras de campos
  public mask_fechanacimiento =  [ /\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/];
  public mask_tel = [/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/];

  async obtenerAlumno(id){

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


    await this.apiservice.ObtenerAlumno(id).subscribe(

          (data) => {
              this.alumno = data;
              this.GradosString = this.alumno.alumno_grados;
              this.calc_edad1 = this.alumno.edad;
              this.form_editar = this.fb.group({
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




  }



  constructor(private modalService: ModalService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder, private http: HttpClient, private apiservice: ApiService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder,private auth: AuthService) {

      //obtener el parametro

      var id_est = this.route.snapshot.paramMap.get('id');

      if(parseInt(id_est)==0){
        this.editable=false;
      }else{
        //ejecuta la consulta
       this.id_alumno=id_est;
       this.obtenerAlumno(this.id_alumno);
        this.editable=true;
        this.grado_disabled = true;
      }



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
      this.form_nuevo = this.formBuilder.group({
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

//editar


this.form_nuevo = this.fb.group({
  Codigo_Val:['',[Validators.required]],
  Alumno_PrimerNombre: ['', [Validators.required,Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
  Alumno_SegundoNombre: ['',[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
  Alumno_TecerNombre: ['',[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
  Alumno_PrimerApellido: ['', [Validators.required,Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
  Alumno_SegundoApellido: ['', [Validators.required,,Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
  sexos:['',[Validators.required]],
  fecha_nacimiento: ['', [Validators.required,Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)]],
  edad:['',[Validators.required]],
  nacionalidades:['',[Validators.required]],
  departamentos:['',[Validators.required]],
  municipios:['',[Validators.required]],
  religiones:['',[Validators.required]],
  iglesia_asist:[''],
  Centro_proviene:[''],
  Centro_ubicacion:[''],
  grados:['1'],
  Est_antes:['2'],
  anio:['0'],
  mot:[''],
  Alumno_TieneHermanos:['1'],
  Alumno_Grados:[''],
  Alumno_NombrePadre:['',[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
  Alumno_ApellidoPadre:['',[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
  Alumno_ProfesionPadre:[''],
  Alumno_TelefonoPadre:['',[Validators.pattern(/(\d{4}(-)\d{4})$/)]],
  Alumno_NombreMadre:['',[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
  Alumno_ApellidoMadre:['',[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
  Alumno_ProfesionMadre:[''],
  Alumno_TelefonoMadre:['',[Validators.pattern(/(\d{4}(-)\d{4})$/)]],
  Alumno_Direc:[''],
  Alumno_Telefono:['',[Validators.pattern(/(\d{4}(-)\d{4})$/)]],
  Alumno_foto:['',[Validators.required]],
  Alumno_PFExalumno:['1']

  /*name: ['', [Validators.required]],
  company: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
  email: ['', [Validators.required, Validators.email]],
  age: ['', [Validators.required]],

  password: ['', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],*/
});





}

  //para validar si es nuevo o editar
  editar(){
    return this.editable;
  }

  //para calcular la edad
  calcularedad(fecha: string){

      let splitStr = fecha.split('/');
      var today = new Date();
      var year = today.getFullYear();

      var dia = parseInt( splitStr[0]);
      var mes = parseInt(splitStr[1]);
      var anio = parseInt(splitStr[2]);


          var edad = year - anio;

          var m = today.getMonth() - mes;

          if (today.getMonth() + 1 < mes || (today.getMonth() + 1 == mes && today.getDate() < dia)) {
          edad--;
          }
       return edad;
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




  //guardar form
  Actualizar() {
    //alert(JSON.stringify(this.form_editar.value));
  }



  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  get valores() { return this.form_nuevo.controls; }
  get valores1() { return this.form_editar.controls; }



//Generar Nuevo Codigo

async generarNuevoCodigo(){

  this.Info_Codigo =  await this.apiservice.ObtenerCodigo().toPromise();

  this.Alumno_NuevoCodigo = this.Info_Codigo.inicial + '-' + this.valores.Alumno_PrimerApellido.value.substring(0,1).toUpperCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") + '-'+this.Info_Codigo.numero;

}


ActualizarAlumno(){


  var usuid = this.tokenStorage.getUser().usu_id;


  let formData1 = new FormData();
  this.calc_edad1 = this.alumno.edad;



  if(this.uploadedFiles != undefined){
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData1.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
    }
  }
  formData1.append('Alumno_PrimerNombre',this.valores1.Alumno_PrimerNombre.value);
  formData1.append('Alumno_SegundoNombre',this.valores1.Alumno_SegundoNombre.value);
  formData1.append('Alumno_TecerNombre',this.valores1.Alumno_TecerNombre.value);
  formData1.append('Alumno_PrimerApellido',this.valores1.Alumno_PrimerApellido.value);
  formData1.append('Alumno_SegundoApellido',this.valores1.Alumno_SegundoApellido.value);
 formData1.append('sexos',this.valores1.sexos.value);
  formData1.append('fecha_nacimiento',this.valores1.fecha_nacimiento.value);
  formData1.append('edad1',this.calc_edad1);
  formData1.append('nacionalidades',this.valores1.nacionalidades.value);
  formData1.append('religiones',this.valores1.religiones.value);
  formData1.append('iglesia_asist',this.valores1.iglesia_asist.value);
  formData1.append('Centro_proviene',this.valores1.Centro_proviene.value);
  formData1.append('Centro_ubicacion',this.valores1.Centro_ubicacion.value);
  formData1.append('grados',this.valores1.grados.value);
  formData1.append('Est_antes',this.valores1.Est_antes.value);
  if (!this.AnioReadOnly) {
    formData1.append('anio',this.valores1.anio.value);
  }else{
    formData1.append('anio',"0");
  }

  formData1.append('mot',this.valores1.mot.value);
  formData1.append('Alumno_TieneHermanos',this.valores1.Alumno_TieneHermanos.value);
  formData1.append('Alumno_Grados',this.GradosString);
  formData1.append('Alumno_NombrePadre',this.valores1.Alumno_NombrePadre.value);
  formData1.append('Alumno_ApellidoPadre',this.valores1.Alumno_ApellidoPadre.value);
  formData1.append('Alumno_ProfesionPadre',this.valores1.Alumno_ProfesionPadre.value);
  formData1.append('Alumno_TelefonoPadre',this.valores1.Alumno_TelefonoPadre.value);
  formData1.append('Alumno_NombreMadre',this.valores1.Alumno_NombreMadre.value);
  formData1.append('Alumno_ApellidoMadre',this.valores1.Alumno_ApellidoMadre.value);
  formData1.append('Alumno_ProfesionMadre',this.valores1.Alumno_ProfesionMadre.value);
  formData1.append('Alumno_TelefonoMadre',this.valores1.Alumno_TelefonoMadre.value);
  formData1.append('Alumno_Direc',this.valores1.Alumno_Direc.value);
  formData1.append('departamentos',this.valores1.departamentos.value);
  formData1.append('municipios',this.valores1.municipios.value);
  formData1.append('Alumno_Telefono',this.valores1.Alumno_Telefono.value);
  formData1.append('Usu_Id',usuid);
  formData1.append('Est_Id','1');
  formData1.append('id',this.id_alumno);
  formData1.append('Alumno_PFExalumno',this.valores1.Alumno_PFExalumno.value);


  if(this.uploadedFiles != undefined){


    this.apiservice.ActualizarAlumnoTodo(formData1).subscribe((res)=> {
      this.router.navigateByUrl('admision/Index');
    });
  } else{

    this.apiservice.ActualizarAlumnoSinFoto(formData1).subscribe((res)=> {
      this.router.navigateByUrl('admision/Index');
    });
  }




 }


enviado=0;

 async InsertarNuevo(){


  var usuid = this.tokenStorage.getUser().usu_id;

  await  this.generarNuevoCodigo();


  let formData = new FormData();
  for (var i = 0; i < this.uploadedFiles.length; i++) {
    formData.append("file", this.uploadedFiles[i], this.uploadedFiles[i].name);
  }
  formData.append('Alumno_Codigo',this.Alumno_NuevoCodigo);
  formData.append('Codigo_Val',this.valores.Codigo_Val.value);
  formData.append('Alumno_PrimerNombre',this.valores.Alumno_PrimerNombre.value);
  formData.append('Alumno_SegundoNombre',this.valores.Alumno_SegundoNombre.value);
  formData.append('Alumno_TecerNombre',this.valores.Alumno_TecerNombre.value);
  formData.append('Alumno_PrimerApellido',this.valores.Alumno_PrimerApellido.value);
  formData.append('Alumno_SegundoApellido',this.valores.Alumno_SegundoApellido.value);
 formData.append('sexos',this.valores.sexos.value);
  formData.append('fecha_nacimiento',this.valores.fecha_nacimiento.value);
  formData.append('edad', this.calc_edad);
  formData.append('nacionalidades',this.valores.nacionalidades.value);
  formData.append('religiones',this.valores.religiones.value);
  formData.append('iglesia_asist',this.valores.iglesia_asist.value);
  formData.append('Centro_proviene',this.valores.Centro_proviene.value);
  formData.append('Centro_ubicacion',this.valores.Centro_ubicacion.value);
  formData.append('grados',this.valores.grados.value);
  formData.append('Est_antes',this.valores.Est_antes.value);
  if (!this.AnioReadOnly) {
    formData.append('anio',this.valores.anio.value);
  }else{
    formData.append('anio',"0");
  }

  formData.append('mot',this.valores.mot.value);
  formData.append('Alumno_TieneHermanos',this.valores.Alumno_TieneHermanos.value);
  formData.append('Alumno_Grados',this.GradosString);
  formData.append('Alumno_NombrePadre',this.valores.Alumno_NombrePadre.value);
  formData.append('Alumno_ApellidoPadre',this.valores.Alumno_ApellidoPadre.value);
  formData.append('Alumno_ProfesionPadre',this.valores.Alumno_ProfesionPadre.value);
  formData.append('Alumno_TelefonoPadre',this.valores.Alumno_TelefonoPadre.value);
  formData.append('Alumno_NombreMadre',this.valores.Alumno_NombreMadre.value);
  formData.append('Alumno_ApellidoMadre',this.valores.Alumno_ApellidoMadre.value);
  formData.append('Alumno_ProfesionMadre',this.valores.Alumno_ProfesionMadre.value);
  formData.append('Alumno_TelefonoMadre',this.valores.Alumno_TelefonoMadre.value);
  formData.append('Alumno_Direc',this.valores.Alumno_Direc.value);
  formData.append('departamentos',this.valores.departamentos.value);
  formData.append('municipios',this.valores.municipios.value);
  formData.append('Alumno_Telefono',this.valores.Alumno_Telefono.value);
  formData.append('Usu_Id',usuid);
  formData.append('Est_Id','1');
  formData.append('Alumno_PFExalumno',this.valores.Alumno_PFExalumno.value);

  if(this.enviado==0){
    this.enviado = 1;
  this.apiservice.nuevoAlumno(formData).subscribe((res)=> {
    this.router.navigateByUrl('admision/Index');
  });
  }

 }
//Obtener FOTO
ObtenerFoto(){

  this.subscriber = this.route.params.subscribe(params => {
    this.apiservice.ObtenerFoto('uploads\\HiL8SW-cQNpmimJWsH9u4y6g.JPG').subscribe((res)=> {

      this.showPdf(res.body);

  });
  });


}
codval=false;
ValidarCodigo(cod){

  this.subscriber = this.route.params.subscribe(params => {
    this.apiservice.ValCodigo(cod).subscribe((data) => {
      this.codval = false;
      document.getElementById('Codigo_Val').style.borderColor='gray';
      },
      (error: any) => {
        this.codval = true;
         document.getElementById('Codigo_Val').focus();
         document.getElementById('Codigo_Val').style.borderColor='red';
          return;
      });
  });


}


showPdf(Foto64) {

  let docDefinition = {
      content: [
        {
          text: 'PDF Generated with Image from external URL',
          fontSize : 20
        },{
          image: 'data:image/jpeg;base64,'+Foto64
        }
      ]
    };

    pdfMake.createPdf(docDefinition).download("Name of Print");

}

  Guardar() {
    //alert(JSON.stringify(this.form_nuevo.value));
  }

validarMunicipio(){
  //console.log(this.valores.municipios.value);

  return true;
}


  //para seleccionar los municipios del departamento seleccionado
  SelecccionarMunis(dato){
    //console.log('CARGO ESTOS'+this.valores.municipios.value);
   this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data:mMunicipio[]) => {
        this.municipios = data;
        });
    });
    of(this.getMunis()).subscribe(dep => {
      this.municipios = dep;
      this.form_editar.controls.municipios.patchValue(this.municipios[0].muni_id);
      this.form_nuevo.controls.municipios.patchValue(this.municipios[0].muni_id);

    });
  }

  //subir archivo
  upload(files: File[]){
    //pick from one of the 4 styles of file uploads below
    this.files = files;
  }



  //juntar grados
  juntar(data,check){

    if (check) {
      this.ArrayGrados.push(data);
    } else {
      let index = this.ArrayGrados.findIndex(x => x.value == data);
      this.ArrayGrados.splice(index,1);
    }

    this.GradosString = this.ArrayGrados.join(",");

  }



  //validar readonlys o desahibilitar vistas
  validarantes(dato){
    if(dato==1){
      this.AnioReadOnly = false;
    }else{
      this.AnioReadOnly=true;
    }
  }

  validarHermanos(dato){
    if(dato==1){
      this.GradosHermanos=true;
    }else{
      this.GradosHermanos=false;
    }


  }
  Alumno_PFExalumno(dato){
    if(dato==1){
      this.AlumnoPFExalumno=true;
    }else{
      this.AlumnoPFExalumno=false;
    }


  }

  ngOnInit(): void {

        this.auth.RevalSesion();





       //console.log(this.alumno);


  }

}


