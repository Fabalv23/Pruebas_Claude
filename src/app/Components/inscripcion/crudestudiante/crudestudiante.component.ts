import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { mNacionalidad } from 'src/models/mNacionalidad';
import { mDepartamento } from 'src/models/mDepartamento';
import { mMunicipio } from 'src/models/mMunicipios';
import { mReligion } from 'src/models/mReligion';
import { mGrado } from 'src/models/mGrado';
import { Jornada } from 'src/models/Jornada';
import { of } from 'rxjs';
import { mSexo } from 'src/models/mSexo';
import { mEtnico } from 'src/models/mEtnico';
import { mEstadoCivil } from 'src/models/mEstadoCivil';
import { mTransporte } from 'src/models/mTransporte';
import { mVive } from 'src/models/mVive';
import { mAlumno } from 'src/models/mAlumno';
import { TokenStorageService } from 'src/Services/token-storage.service';



@Component({
  selector: 'app-crudestudiante',
  templateUrl: './crudestudiante.component.html',
  styleUrls: ['./crudestudiante.component.css']
})
export class CRUDEstudianteComponent implements OnInit {

  //masks
  public cui_mask = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  public mask_fechanacimiento = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  public mask_tel = [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  //form
  form_inscripcion: FormGroup;
  private subscriber: any;
  sexos: mSexo[];
  nacionalidades: mNacionalidad[];

  religiones: mReligion[];
  grados: mGrado[];
  etnicos: mEtnico[];
  estadocivil: mEstadoCivil[];
  transportes: mTransporte[];
  vive: mVive[];
  jornadas: Jornada[];


  //departamentos y municipios
  departamentos: mDepartamento[];
  municipios: mMunicipio[];

  departamentos1: mDepartamento[];
  municipios1: mMunicipio[];

  departamentos2: mDepartamento[];
  municipios2: mMunicipio[];

  departamentos3: mDepartamento[];
  municipios3: mMunicipio[];

  departamentos4: mDepartamento[];
  municipios4: mMunicipio[];

  departamentos5: mDepartamento[];
  municipios5: mMunicipio[];

  departamentos6: mDepartamento[];
  municipios6: mMunicipio[];

  departamentos7: mDepartamento[];
  municipios7: mMunicipio[];

  departamentos8: mDepartamento[];
  municipios8: mMunicipio[];
  departamentos9: mDepartamento[];
  municipios9: mMunicipio[];
  departamentos10: mDepartamento[];
  municipios10: mMunicipio[];
  departamentos11: mDepartamento[];

  municipios11: mMunicipio[];

  //globales
  disabled_selects = true;

  alumno: mAlumno;



  //checkboxes

  Estu_Bautizo: any = false;
  Estu_Comunion: any = false;
  Estu_Confirmacion: any = false;

  Estu_Sarampeon: any = false;
  Estu_Rubeola: any = false;
  Estu_Epilepsia: any = false;


  Estu_Varicela: any = false;
  Estu_Paperas: any = false;
  Estu_ReflujoGastrico: any = false;
  Estu_Heptatitis: any = false;
  Estu_Gastritis: any = false;
  Estu_Sinusitis: any = false;
  Estu_PanadolNino: any = false;
  Estu_TabcinNino: any = false;
  Estu_HistaprinNino: any = false;
  Estu_NauseolNino: any = false;
  Estu_PananolAdulto: any = false;
  Estu_TabcinAdulto: any = false;
  Estu_HistrapinAdulto: any = false;
  Estu_NauseolAdulto: any = false;
  Estu_Alkaseltzer: any = false;
  Estu_Peptobismol: any = false;
  Estu_Winasorb: any = false;
  Estu_Neomelubrina: any = false;
  Estu_Dorival: any = false;
  Estu_Sertal: any = false;



  async obtenerAlumno(id) {

    await this.apiservice.ObtenerAlumno(id).subscribe(
      (data) => {
        this.alumno = data;

        //chechboxex


        let jornada = 1;
        if (this.alumno.grad_id == 23 || this.alumno.grad_id == 24 || this.alumno.grad_id == 25) {
          jornada = 2;
        }

        let correo = this.generarCorreo(this.alumno.alumno_codigo);


        this.form_inscripcion = this.fb.group({


          Estu_Codigo: [this.alumno.alumno_codigo],
          Estu_PrimerApellido: [this.alumno.alumno_primerapellido],
          Estu_SegundoApellido: [this.alumno.alumno_segundoapellido],
          Estu_PrimerNombre: [this.alumno.alumno_primernombre],
          Estu_SegundoNombre: [this.alumno.alumno_segundonombre],
          Estu_TercerNombre: [this.alumno.alumno_tecernombre],
          sexo_estudiante: [this.alumno.alumno_sexo],
          fecha_nacimiento: [this.alumno.fecha_nacimiento],
          nacionalidad_estudiante: [this.alumno.nac_id],
          Estu_Cui: ['', [Validators.required, Validators.pattern(/^(([0-9]{4})(\s)([0-9]{5})(\s)([0-9]{4}))$/)]],
          departamento_estudiante: [this.alumno.depto_id],
          municipio_estudiante: [this.alumno.muni_id],
          departamento_vive: [''],
          municipio_vive: [''],
          estu_direc: ['', [Validators.required, Validators.minLength(10)]],
          vive: ['0'],
          etnicos: ['0'],
          religiones: [this.alumno.rel_id],
          Estu_Bautizo: [''],
          Estu_Comunion: [''],
          Estu_Confirmacion: [''],
          grados: [this.alumno.grad_id],
          jornadas: [jornada],
          Estu_TieneHermanos: [this.alumno.alumno_tienehermanos],
          Estu_CuantosHermanos: [''],
          Estu_Grados: [this.alumno.alumno_grados],
          Estu_CentroEducativo: [this.alumno.centro_proviene],
          Estu_EstuDomiciliarTelefono: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_TelefonoCelular: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_Email: [correo],
          Estu_NombrePadre: [this.alumno.alumno_nombrepadre, [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
          Estu_ApellidoPadre: [this.alumno.alumno_apellidopadre, [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
          nacionalidad_padre: ['0'],
          Estu_EdadPadre: [''],
          Estu_DpiPasaportePadre: ['', [Validators.pattern(/^(([0-9]{4})(\s)([0-9]{5})(\s)([0-9]{4}))$/)]],
          departamento_padre: ['0'],
          municipio_padre: ['0'],
          Estu_ExtendidoPadre: [''],
          Estu_NitPadre: [''],
          estadocivil_padre: ['0'],
          departamento_padre_vive: [''],
          municipio_padre_vive: [''],
          Estu_DirecPadre: [''],
          Estu_TelefonoPadre: [this.alumno.alumno_telefonopadre, [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_CelularPadre: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_EmailPadre: [''],
          Estu_ProfesionPadre: [this.alumno.alumno_profesionpadre],
          Estu_LugarTrabajoPadre: [''],
          municipio_padre_trabajo: [''],
          departamento_padre_trabajo: [''],
          Estu_DirecTrabajoPadre: [''],
          Estu_TelefonoTrabajoPadre: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_NombreMadre: [this.alumno.alumno_nombremadre, [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
          Estu_ApellidoMadre: [this.alumno.alumno_apellidomadre, [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
          nacionalidad_madre: ['0'],
          Estu_EdadMadre: [''],
          Estu_DpiPasaporteMadre: ['', [Validators.pattern(/^(([0-9]{4})(\s)([0-9]{5})(\s)([0-9]{4}))$/)]],
          departamento_madre: ['0'],
          municipio_madre: ['0'],
          Estu_ExtendidoMadre: [''],
          Estu_NitMadre: [''],
          estadocivil_madre: ['0'],
          departamento_madre_vive: [''],
          municipio_madre_vive: [''],
          Estu_DirecMadre: [''],
          Estu_TelefonoMadre: [this.alumno.alumno_telefonomadre, [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_CelularMadre: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_EmailMadre: [''],
          Estu_ProfesionMadre: [this.alumno.alumno_profesionmadre],
          Estu_LugarTrabajoMadre: [''],
          municipio_madre_trabajo: [''],
          departamento_madre_trabajo: [''],
          Estu_DirecTrabajoMadre: [''],
          Estu_TelefonoTrabajoMadre: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Responsable: ['', [Validators.required]],
          Estu_NombreResponsable: ['', [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
          Estu_ApellidoResponsable: ['', [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
          nacionalidad_Responsable: ['0'],
          Estu_EdadResponsable: [''],
          Estu_DpiPasaporteResponsable: ['', [Validators.pattern(/^(([0-9]{4})(\s)([0-9]{5})(\s)([0-9]{4}))$/)]],
          departamento_responsable: ['0'],
          municipio_responsable: ['0'],
          Estu_ExtendidoResponsable: [''],
          Estu_NitResponsable: [''],
          estadocivil_responsable: ['0'],
          departamento_responsable_vive: [''],
          municipio_responsable_vive: [''],
          Estu_DirecResponsable: [''],
          Estu_TelefonoResponsable: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_CelularResponsable: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_EmailResponsable: [''],
          Estu_ProfesionResponsable: [''],
          Estu_LugarTrabajoResponsable: [''],
          municipio_responsable_trabajo: [''],
          departamento_responsable_trabajo: [''],
          Estu_DirecTrabajoResponsable: [''],
          Estu_TelefonoTrabajoResponsable: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          transporte1: [0],
          transporte2: [0],
          municipio_clinica: [''],
          departamento_clinica: [''],
          Estu_Orienta: [0],
          Estu_NombreEmergencia: ['', [Validators.required, Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
          Estu_TelefonoCasaEmergencia: ['', [Validators.required, Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_CelularEmergencia: ['', [Validators.required, Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_TelfonoTrabajoEmergencia: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_Parentesco: [''],
          Estu_MedicoEstudiante: [''],
          Estu_DirecClinica: [''],
          Estu_TelefonoClinica: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_CelularClinica: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],
          Estu_Hospital: [''],
          Estu_TipoSangre: [''],
          Estu_UtilizaBus: ['0'],
          Estu_PadeceEnfermedad: [''],
          Estu_AlergicoMedicamente: [''],
          Estu_Operado: [''],
          Estu_MedicamentoSiempre: ['1'],
          Estu_NombredelMedicamento: [''],
          Estu_Sarampeon: [''],
          Estu_Rubeola: [''],
          Estu_Epilepsia: [''],
          Estu_Varicela: [''],
          Estu_Paperas: [''],
          Estu_ReflujoGastrico: [''],
          Estu_Heptatitis: [''],
          Estu_Gastritis: [''],
          Estu_Sinusitis: [''],
          Estu_PanadolNino: [''],
          Estu_TabcinNino: [''],
          Estu_HistaprinNino: [''],
          Estu_NauseolNino: [''],
          Estu_PananolAdulto: [''],
          Estu_TabcinAdulto: [''],
          Estu_HistrapinAdulto: [''],
          Estu_NauseolAdulto: [''],
          Estu_Alkaseltzer: [''],

          Estu_Peptobismol: [''],
          Estu_Winasorb: [''],
          Estu_Neomelubrina: [''],
          Estu_Dorival: [''],
          Estu_Sertal: [''],
          Estu_SeguroMedico: ['1'],
          Estu_NombreSeguro: [''],
          Estu_Afiliacion: [''],
          Estu_AfiliaccionTelefono: ['', [Validators.pattern(/(\d{4}(-)\d{4})$/)]],

          Estu_PadeceEnfermedad1: ['0', [Validators.required]],
          Estu_AlergicoMedicamente1: ['0', [Validators.required]],
          Estu_Operado1: ['0']
        });



      }
    );
  }

  id_usuario;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private apiservice: ApiService,
    private route: ActivatedRoute, private router: Router, public fb: FormBuilder, private auth: AuthService, private tokenstorage: TokenStorageService) {


    var id_est = this.route.snapshot.paramMap.get('id');

    this.id_usuario = id_est;

    this.obtenerAlumno(id_est);




    //obtener selects de la DB
    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getSexo().subscribe((data: mSexo[]) => {
        this.sexos = data;
      });
    });
    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getNacionalidad().subscribe((data: mNacionalidad[]) => {
        this.nacionalidades = data;
      });
    });
    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getDepartamentos().subscribe((data: mDepartamento[]) => {
        this.departamentos = data;
        this.departamentos1 = data;
        this.departamentos2 = data;
        this.departamentos3 = data;
        this.departamentos4 = data;
        this.departamentos5 = data;
        this.departamentos6 = data;
        this.departamentos7 = data;
        this.departamentos8 = data;
        this.departamentos9 = data;
        this.departamentos10 = data;
        this.departamentos11 = data;
      });
    });

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMunicipios().subscribe((data: mMunicipio[]) => {
        this.municipios = data;
      });
    });

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getReligion().subscribe((data: mReligion[]) => {
        this.religiones = data;
      });
    });

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getGrados().subscribe((data: mGrado[]) => {
        this.grados = data;
      });
    });


    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getEtnico().subscribe((data: mEtnico[]) => {
        this.etnicos = data;
      });
    });

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getVive().subscribe((data: mVive[]) => {
        this.vive = data;
      });
    });

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getTransporte().subscribe((data: mTransporte[]) => {
        this.transportes = data;
      });
    });

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getEstadoCivil().subscribe((data: mEstadoCivil[]) => {
        this.estadocivil = data;
      });
    });

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getJornadas().subscribe((data: Jornada[]) => {
        this.jornadas = data;
      });
    });
    /*
        // async selects
        of(this.getSexo()).subscribe(sexos => {
          this.sexos = sexos;
          this.form_inscripcion.controls.sexos.patchValue(this.sexos[0].id_sexo);
          this.form_inscripcion.controls.sexo_estudiante.patchValue(this.sexos[0].id_sexo);
    
    
        });
    
        of(this.getNac()).subscribe(nacionalidad => {
          this.nacionalidades = nacionalidad;
          this.form_inscripcion.controls.nacionalidad_estudiante.patchValue(this.nacionalidades[0].nac_id);
          this.form_inscripcion.controls.nacionalidad_padre.patchValue(this.nacionalidades[0].nac_id);
          this.form_inscripcion.controls.nacionalidad_madre.patchValue(this.nacionalidades[0].nac_id);
          this.form_inscripcion.controls.nacionalidad_responsable.patchValue(this.nacionalidades[0].nac_id);
    
        });
        of(this.getDepartamento()).subscribe(dep => {
          this.departamentos = dep;
    
    
          this.form_inscripcion.controls.departamento_estudiante.patchValue(this.departamentos[0].dep_id);
          this.form_inscripcion.controls.departamento_vive.patchValue(this.departamentos[0].dep_id);
          this.form_inscripcion.controls.departamento_padre.patchValue(this.departamentos[0].dep_id);
          this.form_inscripcion.controls.departamento_padre_vive.patchValue(this.departamentos[0].dep_id);
    
          this.form_inscripcion.controls.departamento_madre.patchValue(this.departamentos[0].dep_id);
          this.form_inscripcion.controls.departamento_madre_vive.patchValue(this.departamentos[0].dep_id);
    
          this.form_inscripcion.controls.departamento_responsable.patchValue(this.departamentos[0].dep_id);
          this.form_inscripcion.controls.departamento_responsable_vive.patchValue(this.departamentos[0].dep_id);
          this.form_inscripcion.controls.departamento_responsable_trabajo.patchValue(this.departamentos[0].dep_id);
    
    
          this.form_inscripcion.controls.departamento_clinica.patchValue(this.departamentos[0].dep_id);
    
        });
        of(this.getMunis()).subscribe(dep => {
          this.municipios = dep;
          this.form_inscripcion.controls.municipio_estudiante.patchValue(this.municipios[0].muni_id);
          this.form_inscripcion.controls.municipio_vive.patchValue(this.municipios[0].muni_id);
          this.form_inscripcion.controls.municipio_padre.patchValue(this.municipios[0].muni_id);
          this.form_inscripcion.controls.municipio_padre_vive.patchValue(this.municipios[0].muni_id);
          this.form_inscripcion.controls.municipio_padre_trabajo.patchValue(this.municipios[0].muni_id);
    
          this.form_inscripcion.controls.municipio_madre.patchValue(this.municipios[0].muni_id);
          this.form_inscripcion.controls.municipio_madre_vive.patchValue(this.municipios[0].muni_id);
          this.form_inscripcion.controls.municipio_madre_trabajo.patchValue(this.municipios[0].muni_id);
    
          this.form_inscripcion.controls.municipio_responsable.patchValue(this.municipios[0].muni_id);
          this.form_inscripcion.controls.municipio_responsable_vive.patchValue(this.municipios[0].muni_id);
          this.form_inscripcion.controls.municipio_responsable_trabajo.patchValue(this.municipios[0].muni_id);
          this.form_inscripcion.controls.municipio_clinica.patchValue(this.municipios[0].muni_id);
        });
    
        of(this.getReligion()).subscribe(dep => {
          this.religiones = dep;
    
          this.form_inscripcion.controls.religiones.patchValue(this.religiones[0].rel_id);
    
        });
    
        of(this.getGrados()).subscribe(dep => {
          this.grados = dep;
          this.form_inscripcion.controls.grados.patchValue(this.grados[0].grad_id);
        });
    
        of(this.getVive()).subscribe(dep => {
          this.vive = dep;
          this.form_inscripcion.controls.vive.patchValue(this.vive[0].vive_id);
        });
        of(this.getEtnico()).subscribe(dep => {
          this.etnicos = dep;
          this.form_inscripcion.controls.etnicos.patchValue(this.etnicos[0].etnico_id);
        });
    
        of(this.getJornadas()).subscribe(dep => {
          this.jornadas = dep;
          this.form_inscripcion.controls.jornadas.patchValue(this.jornadas[0].id_jornada);
        });
    
        of(this.getEstadoCivil()).subscribe(dep => {
          this.estadocivil = dep;
          this.form_inscripcion.controls.estadocivil_padre.patchValue(this.estadocivil[0].estado_id);
          this.form_inscripcion.controls.estadocivil_madre.patchValue(this.estadocivil[0].estado_id);
          this.form_inscripcion.controls.estadocivil_responsable.patchValue(this.estadocivil[0].estado_id);
        });
    
        of(this.getTransporte()).subscribe(dep => {
          this.transportes = dep;
          this.form_inscripcion.controls.transporte1.patchValue(this.transportes[0].trans_id);
          this.form_inscripcion.controls.transporte2.patchValue(this.transportes[0].trans_id);
        });
    */
    this.form_inscripcion = this.fb.group({

      Estu_Codigo: [''],
      Estu_PrimerApellido: [''],
      Estu_SegundoApellido: [''],
      Estu_PrimerNombre: [''],
      Estu_SegundoNombre: [''],
      Estu_TercerNombre: [''],
      sexo_estudiante: [''],
      fecha_nacimiento: [''],
      nacionalidad_estudiante: [''],
      Estu_Cui: ['', [Validators.required, Validators.pattern(/^(([0-9]{4})(\s)([0-9]{5})(\s)([0-9]{4}))$/)]],
      departamento_estudiante: [''],
      municipio_estudiante: [''],
      departamento_vive: [''],
      municipio_vive: [''],
      estu_direc: ['', [Validators.required, Validators.minLength(10)]],
      vive: [''],
      etnicos: [''],

      religiones: [''],
      Estu_Bautizo: [''],
      Estu_Comunion: [''],
      Estu_Confirmacion: [''],
      grados: [''],
      jornadas: [''],
      Estu_TieneHermanos: [''],
      Estu_CuantosHermanos: [''],
      Estu_Grados: [''],
      Estu_CentroEducativo: [''],
      Estu_EstuDomiciliarTelefono: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_TelefonoCelular: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_Email: [''],
      Estu_NombrePadre: ['', [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
      Estu_ApellidoPadre: ['', [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
      nacionalidad_padre: [''],
      Estu_EdadPadre: [''],
      Estu_DpiPasaportePadre: ['', [Validators.pattern(/^(([0-9]{4})(\s)([0-9]{5})(\s)([0-9]{4}))$/)]],
      departamento_padre: [''],
      municipio_padre: [''],
      Estu_ExtendidoPadre: [''],
      Estu_NitPadre: [''],
      estadocivil_padre: [''],
      departamento_padre_vive: [''],
      municipio_padre_vive: [''],
      Estu_DirecPadre: [''],
      Estu_TelefonoPadre: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_CelularPadre: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_EmailPadre: [''],
      Estu_ProfesionPadre: [''],
      Estu_LugarTrabajoPadre: [''],
      municipio_padre_trabajo: [''],
      departamento_padre_trabajo: [''],
      Estu_DirecTrabajoPadre: [''],
      Estu_TelefonoTrabajoPadre: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_NombreMadre: ['', [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
      Estu_ApellidoMadre: ['', [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
      nacionalidad_madre: [''],
      Estu_EdadMadre: [''],
      Estu_DpiPasaporteMadre: ['', [Validators.pattern(/^(([0-9]{4})(\s)([0-9]{5})(\s)([0-9]{4}))$/)]],
      departamento_madre: [''],
      municipio_madre: [''],
      Estu_ExtendidoMadre: [''],
      Estu_NitMadre: [''],
      estadocivil_madre: [''],
      departamento_madre_vive: [''],
      municipio_madre_vive: [''],
      Estu_DirecMadre: [''],
      Estu_TelefonoMadre: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_CelularMadre: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_EmailMadre: [''],
      Estu_ProfesionMadre: [''],
      Estu_LugarTrabajoMadre: [''],
      municipio_madre_trabajo: [''],
      departamento_madre_trabajo: [''],
      Estu_DirecTrabajoMadre: [''],
      Estu_TelefonoTrabajoMadre: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_NombreResponsable: ['', [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
      Estu_ApellidoResponsable: ['', [Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
      nacionalidad_responsable: [''],
      Estu_EdadResponsable: [''],
      Estu_DpiPasaporteResponsable: ['', [Validators.pattern(/^(([0-9]{4})(\s)([0-9]{5})(\s)([0-9]{4}))$/)]],
      departamento_responsable: [''],
      municipio_responsable: [''],
      Estu_ExtendidoResponsable: [''],
      Estu_NitResponsable: [''],
      estadocivil_responsable: [''],
      departamento_responsable_vive: [''],
      municipio_responsable_vive: [''],
      Estu_DirecResponsable: [''],
      Estu_TelefonoResponsable: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_CelularResponsable: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_EmailResponsable: [''],
      Estu_ProfesionResponsable: [''],
      Estu_LugarTrabajoResponsable: [''],
      municipio_responsable_trabajo: [''],
      departamento_responsable_trabajo: [''],
      Estu_DirecTrabajoResponsable: [''],
      Estu_TelefonoTrabajoResponsable: ['', [Validators.pattern(/\d{8}$/)]],
      transporte1: [''],
      transporte2: [''],
      municipio_clinica: [''],
      departamento_clinica: [''],
      Estu_Orienta: [''],
      Estu_NombreEmergencia: ['', [Validators.required, Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
      Estu_TelefonoCasaEmergencia: ['', [Validators.required, Validators.pattern(/\d{8}$/)]],
      Estu_CelularEmergencia: ['', [Validators.required, Validators.pattern(/\d{8}$/)]],
      Estu_TelfonoTrabajoEmergencia: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_Parentesco: [''],
      Estu_MedicoEstudiante: [''],
      Estu_DirecClinica: [''],
      Estu_TelefonoClinica: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_CelularClinica: ['', [Validators.pattern(/\d{8}$/)]],
      Estu_Hospital: [''],
      Estu_TipoSangre: [''],
      Estu_UtilizaBus: [''],
      Estu_PadeceEnfermedad: [''],
      Estu_AlergicoMedicamente: [''],
      Estu_Operado: [''],
      Estu_MedicamentoSiempre: [''],
      Estu_NombredelMedicamento: [''],
      Estu_Sarampeon: [''],
      Estu_Rubeola: [''],
      Estu_Epilepsia: [''],
      Estu_Varicela: [''],
      Estu_Paperas: [''],
      Estu_ReflujoGastrico: [''],
      Estu_Heptatitis: [''],
      Estu_Gastritis: [''],
      Estu_Sinusitis: [''],
      Estu_PanadolNino: [''],
      Estu_TabcinNino: [''],
      Estu_HistaprinNino: [''],
      Estu_NauseolNino: [''],
      Estu_PananolAdulto: [''],
      Estu_TabcinAdulto: [''],
      Estu_HistrapinAdulto: [''],
      Estu_NauseolAdulto: [''],
      Estu_Alkaseltzer: [''],

      Estu_Peptobismol: [''],
      Estu_Winasorb: [''],
      Estu_Neomelubrina: [''],
      Estu_Dorival: [''],
      Estu_Sertal: [''],
      Estu_SeguroMedico: [''],
      Estu_NombreSeguro: [''],
      Estu_Afiliacion: [''],
      Estu_AfiliaccionTelefono: ['', [Validators.pattern(/\d{8}$/)]],

      Estu_PadeceEnfermedad1: ['', [Validators.required]],
      Estu_AlergicoMedicamente1: ['', [Validators.required]],
      Estu_Operado1: [''],
      Responsable:['',[Validators.required]]
      /*Codigo_Val:['',[Validators.required]],
      Alumno_PrimerNombre: ['', [Validators.required,Validators.pattern(/^([A-ZÁÉÍÓÚÑ][a-záéíóú\']+)$/)]],
      Alumno_SegundoNombre: ['',[Validators.pattern(/^([A-ZÁÉÍÓÚÑ][a-záéíóú\']+)$/)]],
      Alumno_TecerNombre: ['',[Validators.pattern(/^([A-ZÁÉÍÓÚÑ][a-záéíóú\']+)$/)]],
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
      Alumno_TelefonoPadre:['',[Validators.pattern(/\d{8}$/)]],
      Alumno_NombreMadre:['',[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
      Alumno_ApellidoMadre:['',[Validators.pattern(/^(([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+[\s])*(((del|de|Del|De)[\s]))*([A-ZÁÉÍÓÚÑ][a-záéíóúñ\']+)[\s]*|([A-ZÁÉÍÓÚÑ]([a-záéíóúñ\'])+)[\s]*)$/)]],
      Alumno_ProfesionMadre:[''],
      Alumno_TelefonoMadre:['',[Validators.pattern(/\d{8}$/)]],
      Alumno_Direc:[''],
      Alumno_Telefono:['',[Validators.pattern(/\d{8}$/)]],
      Alumno_foto:['',[Validators.required]]
      
      /*name: ['', [Validators.required]],
      company: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required]],
      
      password: ['', [Validators.pattern(/^[a-z0-9_-]{6,18}$/)]],*/
    });




  }

  vive_direccion = "";
  vive_direccion_padre = "";
  vive_direccion_nadre = "";
  vive_direccion_responsable = "";
  extendida_padre = "";
  direc_trabajo_padre = "";
  extendida_madre = "";
  direc_trabajo_madre = "";
  extendida_responsable = "";
  direc_trabajo_responsable = "";
  ///SELECCIONAR LOS MUNICIPIOS

  //para seleccionar los municipios del departamento seleccionado
  SelecccionarMunisEstudiante(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios = data;


      });
    });
    /*of(this.getMunis()).subscribe(dep => {
      this.municipios = dep;
      this.form_inscripcion.controls.municipio_estudiante.patchValue(this.municipios[0].muni_id);
    });*/
  }

  SelecccionarMunisEstudianteVive(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios1 = data;


      });
    });
    /*of(this.getMunis1()).subscribe(dep => {
      this.municipios1 = dep;
      this.form_inscripcion.controls.municipio_vive.patchValue(this.municipios1[0].muni_id);
    });*/
  }

  SelecccionarMunisPadre(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios2 = data;


      });
    });
    /*of(this.getMunis2()).subscribe(dep => {
      this.municipios2 = dep;
      this.form_inscripcion.controls.municipio_padre.patchValue(this.municipios2[0].muni_id);
    });*/
  }

  SelecccionarMunisPadreVive(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios3 = data;


      });
    });
    /*of(this.getMunis3()).subscribe(dep => {
      this.municipios3 = dep;
      this.form_inscripcion.controls.municipio_padre_vive.patchValue(this.municipios3[0].muni_id);
    });*/
  }

  SelecccionarMunisPadreTrabajo(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios4 = data;


      });
    });
    /*of(this.getMunis4()).subscribe(dep => {
      this.municipios4 = dep;
      this.form_inscripcion.controls.municipio_padre_trabajo.patchValue(this.municipios4[0].muni_id);
    });*/
  }

  //madre
  SelecccionarMunisMadre(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios5 = data;


      });
    });
    /*of(this.getMunis5()).subscribe(dep => {
      this.municipios5 = dep;
      this.form_inscripcion.controls.municipio_madre.patchValue(this.municipios5[0].muni_id);
    });*/
  }

  SelecccionarMunisMadreVive(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios6 = data;


      });
    });
    /*of(this.getMunis6()).subscribe(dep => {
      this.municipios6 = dep;
      this.form_inscripcion.controls.municipio_madre_vive.patchValue(this.municipios6[0].muni_id);
    });*/
  }

  SelecccionarMunisMadreTrabajo(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios7 = data;


      });
    });
    /*of(this.getMunis7()).subscribe(dep => {
      this.municipios7 = dep;
      this.form_inscripcion.controls.municipio_padre_trabajo.patchValue(this.municipios7[0].muni_id);
    });*/
  }

  SelecccionarMunisClinica(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios11 = data;


      });
    });
    /*of(this.getMunis11()).subscribe(dep => {
      this.municipios11 = dep;
      this.form_inscripcion.controls.municipio_clinica.patchValue(this.municipios11[0].muni_id);
    });*/
  }

  ubicacion_clinica = "";

  ObtenerDireccionCli() {

    this.apiservice.Direccion(this.Valores.municipio_clinica.value, this.Valores.departamento_clinica.value).subscribe((data) => {

      this.ubicacion_clinica = (data.muni.municipio + ',' + data.depto.departamento);

    });


  }

  CompletarDirecCli() {
    this.Valores.Estu_DirecClinica.setValue(this.Valores.Estu_DirecClinica.value + ', ' + this.ubicacion_clinica);
  }

  get Valores() {
    return this.form_inscripcion.controls;
  }
  //direcciones estudiante
  ObtenerDireccion() {

    this.apiservice.Direccion(this.Valores.municipio_vive.value, this.Valores.departamento_vive.value).subscribe((data) => {

      this.vive_direccion = (data.muni.municipio + ',' + data.depto.departamento);

    });


  }
  CompletarDirec() {
    this.Valores.estu_direc.setValue(this.Valores.estu_direc.value + ', ' + this.vive_direccion);
  }


  //direcciones padre
  ObtenerDireccion1() {

    this.apiservice.Direccion(this.Valores.municipio_padre.value, this.Valores.departamento_padre.value).subscribe((data) => {

      this.extendida_padre = (data.muni.municipio + ',' + data.depto.departamento);

    });


  }
  ObtenerDireccion2() {

    this.apiservice.Direccion(this.Valores.municipio_padre_vive.value, this.Valores.departamento_padre_vive.value).subscribe((data) => {

      this.vive_direccion_padre = (data.muni.municipio + ',' + data.depto.departamento);

    });


  }

  ObtenerDireccion3() {

    this.apiservice.Direccion(this.Valores.municipio_padre_trabajo.value, this.Valores.departamento_padre_trabajo.value).subscribe((data) => {

      this.direc_trabajo_padre = (data.muni.municipio + ',' + data.depto.departamento);

    });


  }

  CompletarDirec1() {
    this.Valores.Estu_DirecPadre.setValue(this.Valores.Estu_DirecPadre.value + ', ' + this.vive_direccion_padre);
  }

  CompletarDirec2() {
    this.Valores.Estu_DirecTrabajoPadre.setValue(this.Valores.Estu_DirecTrabajoPadre.value + ', ' + this.direc_trabajo_padre);
  }

  //madre

  ObtenerDireccion4() {

    this.apiservice.Direccion(this.Valores.municipio_madre.value, this.Valores.departamento_madre.value).subscribe((data) => {

      this.extendida_madre = (data.muni.municipio + ',' + data.depto.departamento);

    });


  }
  ObtenerDireccion5() {

    this.apiservice.Direccion(this.Valores.municipio_madre_vive.value, this.Valores.departamento_madre_vive.value).subscribe((data) => {

      this.vive_direccion_nadre = (data.muni.municipio + ',' + data.depto.departamento);

    });


  }

  ObtenerDireccion6() {

    this.apiservice.Direccion(this.Valores.municipio_madre_trabajo.value, this.Valores.departamento_madre_trabajo.value).subscribe((data) => {

      this.direc_trabajo_madre = (data.muni.municipio + ',' + data.depto.departamento);

    });


  }




  CompletarDirec3() {
    this.Valores.Estu_DirecMadre.setValue(this.Valores.Estu_DirecMadre.value + ', ' + this.vive_direccion_nadre);
  }

  CompletarDirec4() {
    this.Valores.Estu_DirecTrabajoMadre.setValue(this.Valores.Estu_DirecTrabajoMadre.value + ', ' + this.direc_trabajo_madre);
  }


  //Responsable
  validarNitResponsable() {

    var responsable = this.form_inscripcion.controls.Responsable.value;
    switch (responsable) {

      case '1':

        if (this.form_inscripcion.controls.Estu_NitMadre.value.length > 0) {
          return true;
        } else {
          return false;
        }

      case '2':
        if (this.form_inscripcion.controls.Estu_NitPadre.value.length > 0) {
          return true;
        } else {
          return false;
        }

      case '3':

        if (this.form_inscripcion.controls.Estu_NitResponsable.value.length > 0) {
          return true;
        } else {
          return false;
        }

    }


  }
  seccion_responsable = false;
  SeleccionarResponsable(dato) {

    if (dato == 3) {
      this.subscriber = this.route.params.subscribe(params => {
        this.apiservice.getDepartamentos().subscribe((data: mDepartamento[]) => {
          this.departamentos8 = data;
          this.departamentos9 = data;
          this.departamentos10 = data;
        });
      });




      this.seccion_responsable = true;

    } else {
      this.seccion_responsable = false;
    }

  }
  SelecccionarMunisResp(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios8 = data;


      });
    });
    /*of(this.getMunis8()).subscribe(dep => {
      this.municipios8 = dep;
      this.form_inscripcion.controls.municipio_responsable.patchValue(this.municipios8[0].muni_id);
    });*/
  }

  SelecccionarMunisRespVive(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios9 = data;


      });
    });
    /*of(this.getMunis9()).subscribe(dep => {
      this.municipios9 = dep;
      this.form_inscripcion.controls.municipio_responsable_vive.patchValue(this.municipios9[0].muni_id);
    });*/
  }

  SelecccionarMunisRespTrabajo(dato) {

    this.subscriber = this.route.params.subscribe(params => {
      this.apiservice.getMuniID(dato).subscribe((data: mMunicipio[]) => {
        this.municipios10 = data;


      });
    });
    /*of(this.getMunis10()).subscribe(dep => {
      this.municipios10 = dep;
      this.form_inscripcion.controls.municipio_responsable_trabajo.patchValue(this.municipios10[0].muni_id);
    });*/
  }

  ObtenerDireccion7() {

    this.apiservice.Direccion(this.Valores.municipio_responsable.value, this.Valores.departamento_responsable.value).subscribe((data) => {

      this.extendida_responsable = (data.muni.municipio + ',' + data.depto.departamento);

    });


  }
  ObtenerDireccion8() {

    this.apiservice.Direccion(this.Valores.municipio_responsable_vive.value, this.Valores.departamento_responsable_vive.value).subscribe((data) => {

      this.vive_direccion_responsable = (data.muni.municipio + ',' + data.depto.departamento);

    });


  }

  ObtenerDireccion9() {

    this.apiservice.Direccion(this.Valores.municipio_responsable_trabajo.value, this.Valores.departamento_responsable_trabajo.value).subscribe((data) => {

      this.direc_trabajo_responsable = (data.muni.municipio + ',' + data.depto.departamento);

    });


  }

  CompletarDirec5() {
    this.Valores.Estu_DirecResponsable.setValue(this.Valores.Estu_DirecResponsable.value + ', ' + this.vive_direccion_responsable);
  }

  CompletarDirec6() {
    this.Valores.Estu_DirecTrabajoResponsable.setValue(this.Valores.Estu_DirecTrabajoResponsable.value + ', ' + this.direc_trabajo_responsable);
  }






  //obtener var con los listados
  getJornadas() {
    return this.jornadas;
  }
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

  getMunis1() {
    return this.municipios1;
  }
  getMunis2() {
    return this.municipios2;
  }
  getMunis3() {
    return this.municipios3;
  }
  getMunis4() {
    return this.municipios4;
  }
  getMunis5() {
    return this.municipios5;
  }
  getMunis6() {
    return this.municipios6;
  }
  getMunis7() {
    return this.municipios7;
  }
  getMunis8() {
    return this.municipios8;
  }

  getMunis9() {
    return this.municipios9;
  }

  getMunis10() {
    return this.municipios10;
  }

  getMunis11() {
    return this.municipios11;
  }


  getReligion() {
    return this.religiones;
  }

  getGrados() {
    return this.grados;
  }


  getVive() {
    return this.vive;
  }
  getTransporte() {
    return this.transportes;
  }

  getEstadoCivil() {
    return this.estadocivil;
  }

  getEtnico() {
    return this.etnicos;
  }



  ObtenerSangre(dato) {

    switch (dato) {

      case '1':
        this.Valores.Estu_TipoSangre.setValue('O+');
        break;

      case '2':
        this.Valores.Estu_TipoSangre.setValue('O-');
        break;

      case '3':
        this.Valores.Estu_TipoSangre.setValue('A+');
        break;

      case '4':
        this.Valores.Estu_TipoSangre.setValue('A-');
        break;

      case '5':
        this.Valores.Estu_TipoSangre.setValue('B+');
        break;

      case '6':
        this.Valores.Estu_TipoSangre.setValue('B-');
        break;

      case '7':
        this.Valores.Estu_TipoSangre.setValue('AB+');
        break;

      case '8':
        this.Valores.Estu_TipoSangre.setValue('AB-');
        break;

      default:
        this.Valores.Estu_TipoSangre.setValue('N/E');
        break;

    }


  }

  Medicamento = false;

  VerMedicamento(dato) {

    switch (dato) {

      case '1':

        this.Medicamento = false;

        break;


      case '2':
        this.Medicamento = true;

        break;

    }

  }
  Seguro = false;
  VerSeguro(dato) {

    switch (dato) {

      case '1':

        this.Seguro = false;

        break;


      case '2':
        this.Seguro = true;

        break;

    }


  }

  enviado = 0;

  Enviar() {

    var usuid = this.tokenstorage.getUser().usu_id;

    this.Valores.Estu_ExtendidoPadre.setValue(this.extendida_padre);
    this.Valores.Estu_ExtendidoMadre.setValue(this.extendida_madre);
    this.Valores.Estu_ExtendidoResponsable.setValue(this.extendida_responsable);

    if (this.Estu_Bautizo == false) {
      this.Valores.Estu_Bautizo.setValue('0');
    } else {
      this.Valores.Estu_Bautizo.setValue('1');

    }
    if (this.Estu_Comunion == false) {
      this.Valores.Estu_Comunion.setValue('0');
    } else {
      this.Valores.Estu_Comunion.setValue('1');

    }

    if (this.Estu_Confirmacion == false) {
      this.Valores.Estu_Confirmacion.setValue('0');
    } else {
      this.Valores.Estu_Confirmacion.setValue('1');
    }

    if (this.Estu_Sarampeon == false) {
      this.Valores.Estu_Sarampeon.setValue('0');
    } else {
      this.Valores.Estu_Sarampeon.setValue('1');
    }

    if (this.Estu_Rubeola == false) {
      this.Valores.Estu_Rubeola.setValue('0');
    } else {
      this.Valores.Estu_Rubeola.setValue('1');
    }

    if (this.Estu_Epilepsia == false) {
      this.Valores.Estu_Epilepsia.setValue('0');
    } else {
      this.Valores.Estu_Epilepsia.setValue('1');
    }

    if (this.Estu_Varicela == false) {
      this.Valores.Estu_Varicela.setValue('0');
    } else {
      this.Valores.Estu_Varicela.setValue('1');
    }

    if (this.Estu_Paperas == false) {
      this.Valores.Estu_Paperas.setValue('0');
    } else {
      this.Valores.Estu_Paperas.setValue('1');
    }

    if (this.Estu_ReflujoGastrico == false) {
      this.Valores.Estu_ReflujoGastrico.setValue('0');
    } else {
      this.Valores.Estu_ReflujoGastrico.setValue('1');
    }

    if (this.Estu_Heptatitis == false) {
      this.Valores.Estu_Heptatitis.setValue('0');
    } else {
      this.Valores.Estu_Heptatitis.setValue('1');
    }

    if (this.Estu_Gastritis == false) {
      this.Valores.Estu_Gastritis.setValue('0');
    } else {
      this.Valores.Estu_Gastritis.setValue('1');
    }

    if (this.Estu_Sinusitis == false) {
      this.Valores.Estu_Sinusitis.setValue('0');
    } else {
      this.Valores.Estu_Sinusitis.setValue('1');
    }

    if (this.Estu_PanadolNino == false) {
      this.Valores.Estu_PanadolNino.setValue('0');
    } else {
      this.Valores.Estu_PanadolNino.setValue('1');
    }

    if (this.Estu_TabcinNino == false) {
      this.Valores.Estu_TabcinNino.setValue('0');
    } else {
      this.Valores.Estu_TabcinNino.setValue('1');
    }

    if (this.Estu_HistaprinNino == false) {
      this.Valores.Estu_HistaprinNino.setValue('0');
    } else {
      this.Valores.Estu_HistaprinNino.setValue('1');
    }

    if (this.Estu_NauseolNino == false) {
      this.Valores.Estu_NauseolNino.setValue('0');
    } else {
      this.Valores.Estu_NauseolNino.setValue('1');
    }

    if (this.Estu_PananolAdulto == false) {
      this.Valores.Estu_PananolAdulto.setValue('0');
    } else {
      this.Valores.Estu_PananolAdulto.setValue('1');
    }

    if (this.Estu_TabcinAdulto == false) {
      this.Valores.Estu_TabcinAdulto.setValue('0');
    } else {
      this.Valores.Estu_TabcinAdulto.setValue('1');
    }

    if (this.Estu_HistrapinAdulto == false) {
      this.Valores.Estu_HistrapinAdulto.setValue('0');
    } else {
      this.Valores.Estu_HistrapinAdulto.setValue('1');
    }

    if (this.Estu_NauseolAdulto == false) {
      this.Valores.Estu_NauseolAdulto.setValue('0');
    } else {
      this.Valores.Estu_NauseolAdulto.setValue('1');
    }

    if (this.Estu_Alkaseltzer == false) {
      this.Valores.Estu_Alkaseltzer.setValue('0');
    } else {
      this.Valores.Estu_Alkaseltzer.setValue('1');
    }

    if (this.Estu_Peptobismol == false) {
      this.Valores.Estu_Peptobismol.setValue('0');
    } else {
      this.Valores.Estu_Peptobismol.setValue('1');
    }


    if (this.Estu_Winasorb == false) {
      this.Valores.Estu_Winasorb.setValue('0');
    } else {
      this.Valores.Estu_Winasorb.setValue('1');
    }

    if (this.Estu_Sertal == false) {
      this.Valores.Estu_Sertal.setValue('0');
    } else {
      this.Valores.Estu_Sertal.setValue('1');
    }

    if (this.Estu_Neomelubrina == false) {
      this.Valores.Estu_Neomelubrina.setValue('0');
    } else {
      this.Valores.Estu_Neomelubrina.setValue('1');
    }

    if (this.Estu_Dorival == false) {
      this.Valores.Estu_Dorival.setValue('0');
    } else {
      this.Valores.Estu_Dorival.setValue('1');
    }



    if (this.enviado == 0) {
      this.enviado = 1;
     // console.log(JSON.stringify([this.form_inscripcion.value, { id_usuario: usuid }, { estu_id: this.id_usuario }]))

       this.apiservice.InscribirEstudiante(JSON.stringify([this.form_inscripcion.value, { id_usuario: usuid }])).subscribe(data => {
 
         alert('INGRESO CORRECTO');
         this.router.navigateByUrl('inscripcion/Index');
         return;
       },
         (error: any) => {
           alert('Ocurrió un error en el ingreso de los datos, por favor revisar bien o ese codigo ya existe');
           return;
         });
    }


  }


  checkEstu_Bautizo() {
    this.Estu_Bautizo = !this.Estu_Bautizo;

    if (this.Estu_Bautizo) {
      this.Valores.Estu_Bautizo.setValue('1');
    } else {
      this.Valores.Estu_Bautizo.setValue('0');
    }

  }

  checkEstu_Comunion() {
    this.Estu_Comunion = !this.Estu_Comunion;

    if (this.Estu_Comunion) {
      this.Valores.Estu_Comunion.setValue('1');
    } else {
      this.Valores.Estu_Comunion.setValue('0');
    }
  }


  checkEstu_Confirmacion() {
    this.Estu_Confirmacion = !this.Estu_Confirmacion;

    if (this.Estu_Confirmacion) {
      this.Valores.Estu_Confirmacion.setValue('1');
    } else {
      this.Valores.Estu_Confirmacion.setValue('0');
    }
  }

  checkEstu_Sarampeon() {
    this.Estu_Sarampeon = !this.Estu_Sarampeon;

    if (this.Estu_Sarampeon) {
      this.Valores.Estu_Sarampeon.setValue('1');
    } else {
      this.Valores.Estu_Sarampeon.setValue('0');
    }
  }


  checkEstu_Rubeola() {
    this.Estu_Rubeola = !this.Estu_Rubeola;

    if (this.Estu_Rubeola) {
      this.Valores.Estu_Rubeola.setValue('1');
    } else {
      this.Valores.Estu_Rubeola.setValue('0');
    }
  }


  checkEstu_Epilepsia() {
    this.Estu_Epilepsia = !this.Estu_Epilepsia;

    if (this.Estu_Epilepsia) {
      this.Valores.Estu_Epilepsia.setValue('1');
    } else {
      this.Valores.Estu_Epilepsia.setValue('0');
    }
  }


  checkEstu_Varicela() {
    this.Estu_Varicela = !this.Estu_Varicela;

    if (this.Estu_Varicela) {
      this.Valores.Estu_Varicela.setValue('1');
    } else {
      this.Valores.Estu_Varicela.setValue('0');
    }
  }


  checkEstu_Paperas() {
    this.Estu_Paperas = !this.Estu_Paperas;

    if (this.Estu_Paperas) {
      this.Valores.Estu_Paperas.setValue('1');
    } else {
      this.Valores.Estu_Paperas.setValue('0');
    }
  }

  checkEstu_ReflujoGastrico() {
    this.Estu_ReflujoGastrico = !this.Estu_ReflujoGastrico;

    if (this.Estu_ReflujoGastrico) {
      this.Valores.Estu_ReflujoGastrico.setValue('1');
    } else {
      this.Valores.Estu_ReflujoGastrico.setValue('0');
    }
  }

  checkEstu_Heptatitis() {
    this.Estu_Heptatitis = !this.Estu_Heptatitis;

    if (this.Estu_Heptatitis) {
      this.Valores.Estu_Heptatitis.setValue('1');
    } else {
      this.Valores.Estu_Heptatitis.setValue('0');
    }
  }



  checkEstu_Gastritis() {
    this.Estu_Gastritis = !this.Estu_Gastritis;

    if (this.Estu_Gastritis) {
      this.Valores.Estu_Gastritis.setValue('1');
    } else {
      this.Valores.Estu_Gastritis.setValue('0');
    }
  }

  checkEstu_Sinusitis() {
    this.Estu_Sinusitis = !this.Estu_Sinusitis;

    if (this.Estu_Sinusitis) {
      this.Valores.Estu_Sinusitis.setValue('1');
    } else {
      this.Valores.Estu_Sinusitis.setValue('0');
    }
  }

  checkEstu_PanadolNino() {
    this.Estu_PanadolNino = !this.Estu_PanadolNino;

    if (this.Estu_PanadolNino) {
      this.Valores.Estu_PanadolNino.setValue('1');
    } else {
      this.Valores.Estu_PanadolNino.setValue('0');
    }
  }


  checkEstu_TabcinNino() {
    this.Estu_TabcinNino = !this.Estu_TabcinNino;

    if (this.Estu_TabcinNino) {
      this.Valores.Estu_TabcinNino.setValue('1');
    } else {
      this.Valores.Estu_TabcinNino.setValue('0');
    }
  }

  checkEstu_HistaprinNino() {
    this.Estu_HistaprinNino = !this.Estu_HistaprinNino;

    if (this.Estu_HistaprinNino) {
      this.Valores.Estu_HistaprinNino.setValue('1');
    } else {
      this.Valores.Estu_HistaprinNino.setValue('0');
    }
  }


  checkEstu_NauseolNino() {
    this.Estu_NauseolNino = !this.Estu_NauseolNino;

    if (this.Estu_NauseolNino) {
      this.Valores.Estu_NauseolNino.setValue('1');
    } else {
      this.Valores.Estu_NauseolNino.setValue('0');
    }
  }



  checkEstu_PananolAdulto() {
    this.Estu_PananolAdulto = !this.Estu_PananolAdulto;

    if (this.Estu_PananolAdulto) {
      this.Valores.Estu_PananolAdulto.setValue('1');
    } else {
      this.Valores.Estu_PananolAdulto.setValue('0');
    }
  }

  checkEstu_TabcinAdulto() {
    this.Estu_TabcinAdulto = !this.Estu_TabcinAdulto;

    if (this.Estu_TabcinAdulto) {
      this.Valores.Estu_TabcinAdulto.setValue('1');
    } else {
      this.Valores.Estu_TabcinAdulto.setValue('0');
    }
  }


  checkEstu_HistrapinAdulto() {
    this.Estu_HistrapinAdulto = !this.Estu_HistrapinAdulto;

    if (this.Estu_HistrapinAdulto) {
      this.Valores.Estu_HistrapinAdulto.setValue('1');
    } else {
      this.Valores.Estu_HistrapinAdulto.setValue('0');
    }
  }


  checkEstu_NauseolAdulto() {
    this.Estu_NauseolAdulto = !this.Estu_NauseolAdulto;

    if (this.Estu_NauseolAdulto) {
      this.Valores.Estu_NauseolAdulto.setValue('1');
    } else {
      this.Valores.Estu_NauseolAdulto.setValue('0');
    }
  }


  checkEstu_Alkaseltzer() {
    this.Estu_Alkaseltzer = !this.Estu_Alkaseltzer;

    if (this.Estu_Alkaseltzer) {
      this.Valores.Estu_Alkaseltzer.setValue('1');
    } else {
      this.Valores.Estu_Alkaseltzer.setValue('0');
    }
  }


  checkEstu_Peptobismol() {
    this.Estu_Peptobismol = !this.Estu_Peptobismol;

    if (this.Estu_Peptobismol) {
      this.Valores.Estu_Peptobismol.setValue('1');
    } else {
      this.Valores.Estu_Peptobismol.setValue('0');
    }
  }

  checkEstu_Winasorb() {
    this.Estu_Winasorb = !this.Estu_Winasorb;

    if (this.Estu_Winasorb) {
      this.Valores.Estu_Winasorb.setValue('1');
    } else {
      this.Valores.Estu_Winasorb.setValue('0');
    }
  }


  checkEstu_Neomelubrina() {
    this.Estu_Neomelubrina = !this.Estu_Neomelubrina;

    if (this.Estu_Neomelubrina) {
      this.Valores.Estu_Neomelubrina.setValue('1');
    } else {
      this.Valores.Estu_Neomelubrina.setValue('0');
    }
  }


  checkEstu_Dorival() {
    this.Estu_Dorival = !this.Estu_Dorival;

    if (this.Estu_Dorival) {
      this.Valores.Estu_Dorival.setValue('1');
    } else {
      this.Valores.Estu_Dorival.setValue('0');
    }
  }


  checkEstu_Sertal() {
    this.Estu_Sertal = !this.Estu_Sertal;

    if (this.Estu_Sertal) {
      this.Valores.Estu_Sertal.setValue('1');
    } else {
      this.Valores.Estu_Sertal.setValue('0');
    }
  }

  generarCorreo(codigo) {

    return codigo.replace(/-/gi, '').toLowerCase() + '@lasalleantigua.edu.gt';

  }

  checkenfermedad(val) {
    if (val) {
      this.Valores.Estu_PadeceEnfermedad1.setValue('1');
      this.VerEnfermedad('1')
    } else {
      this.Valores.Estu_PadeceEnfermedad1.setValue('2');
      this.VerEnfermedad('2')


    }
  }

  enfermedad = false;
  VerEnfermedad(dato) {

    switch (dato) {

      case '1':

        this.enfermedad = false;

        break;


      case '2':
        this.enfermedad = true;

        break;

    }


  }

  checkmedicamento1(val) {
    if (val) {
      this.Valores.Estu_AlergicoMedicamente1.setValue('1');
      this.VerMedicamento1('1')
    } else {
      this.Valores.Estu_AlergicoMedicamente1.setValue('2');
      this.VerMedicamento1('2')


    }
  }

  medicamento1 = false;
  VerMedicamento1(dato) {

    switch (dato) {

      case '1':

        this.medicamento1 = false;

        break;


      case '2':
        this.medicamento1 = true;

        break;

    }


  }

  checkoperacion(val) {
    if (val) {
      this.Valores.Estu_Operado1.setValue('1');
      this.VerOperacion('1')
    } else {
      this.Valores.Estu_Operado1.setValue('2');
      this.VerOperacion('2')


    }
  }

  operacion = false;
  VerOperacion(dato) {

    switch (dato) {

      case '1':

        this.operacion = false;

        break;


      case '2':
        this.operacion = true;

        break;

    }


  }

  checkMedicamentoGet(val) {
    if (val == 1) {
      this.Valores.Estu_MedicamentoSiempre.setValue('1');
      this.VermedicamentoSiempre('1')
    } else {
      this.Valores.Estu_MedicamentoSiempre.setValue('2');
      this.VermedicamentoSiempre('2')
    }
  }


  VermedicamentoSiempre(dato) {

    switch (dato) {

      case '1':

        this.Medicamento = false;

        break;


      case '2':
        this.Medicamento = true;

        break;

    }


  }


  checkSeguroGet(val) {
    if (val == 1) {
      this.Valores.Estu_MedicamentoSiempre.setValue('1');
      this.VerSeguroCheck('1')
    } else {
      this.Valores.Estu_MedicamentoSiempre.setValue('2');
      this.VerSeguroCheck('2')


    }
  }


  VerSeguroCheck(dato) {

    switch (dato) {

      case '1':

        this.Seguro = false;

        break;


      case '2':
        this.Seguro = true;

        break;

    }


  }

  ngOnInit(): void {
    this.auth.RevalSesion();



  }

}
