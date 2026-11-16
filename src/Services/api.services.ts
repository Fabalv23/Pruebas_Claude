import { Injectable } from "@angular/core";
import { usuario  } from "../models/usuarios";
import { mSexo  } from "../models/mSexo";
import { HttpClient,HttpErrorResponse,HttpHeaders  } from "@angular/common/http";
import { Observable } from "rxjs";
import {  throwError } from 'rxjs';
import { retry, catchError,map,tap } from 'rxjs/operators';
import { Jornada } from 'src/models/Jornada';
import { Router } from '@angular/router';
import { mNacionalidad } from 'src/models/mNacionalidad';
import { mDepartamento } from 'src/models/mDepartamento';
import { mMunicipio } from 'src/models/mMunicipios';
import { mReligion } from 'src/models/mReligion';
import { mGrado } from 'src/models/mGrado';
import { mVive } from 'src/models/mVive';
import { mTransporte } from 'src/models/mTransporte';
import { mEtnico } from 'src/models/mEtnico';
import { mEstadoCivil } from 'src/models/mEstadoCivil';
import { mEstudiante } from 'src/models/mEstudiante';
import { validar_inscripcion } from 'src/models/validar_inscripcion';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: "root"
})
export class ApiService {
  private user: usuario = { id_usuario: "",email:"", nombre: "",password:""};
  //private url_api = "http://35.226.199.141:5000/api/v1/"; // URL to web api
  //private url_api = "http://localhost:3000/api/v1/"; // URL to web api
  private url_api = environment.server;
  private url_api_adjuntos = environment.archivos

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
      
    return throwError(errorMessage);
  }





  constructor(private http: HttpClient,private router: Router) {}

  public getCiclo(): Observable<any> {
    return this.http.get<any>(this.url_api+'CicloCompleto').pipe(catchError(this.handleError));
  } 
  
  
  public getFrase(): Observable<usuario[]> {
    return this.http.get<usuario[]>(this.url_api+'users').pipe(catchError(this.handleError));
  } 
  
  public getJornadas(): Observable<Jornada[]> {
    return this.http.get<Jornada[]>(this.url_api+'jornadas').pipe(catchError(this.handleError));
  } 

  public getSexo(): Observable<mSexo[]> {
    return this.http.get<mSexo[]>(this.url_api+'sexo').pipe(catchError(this.handleError));
  } 

  public getNacionalidad(): Observable<mNacionalidad[]> {
    return this.http.get<mNacionalidad[]>(this.url_api+'nacionalidad').pipe(catchError(this.handleError));
  } 
  public getDepartamentos(): Observable<mDepartamento[]> {
    return this.http.get<mDepartamento[]>(this.url_api+'departamentos').pipe(catchError(this.handleError));
  } 


  public getMunicipios(): Observable<mMunicipio[]> {
    return this.http.get<mMunicipio[]>(this.url_api+'municipios').pipe(catchError(this.handleError));
  } 


  public getVive(): Observable<mVive[]> {
    return this.http.get<mVive[]>(this.url_api+'vive').pipe(catchError(this.handleError));
  } 
  public getTransporte(): Observable<mTransporte[]> {
    return this.http.get<mTransporte[]>(this.url_api+'transporte').pipe(catchError(this.handleError));
  } 
  public getEtnico(): Observable<mEtnico[]> {
    return this.http.get<mEtnico[]>(this.url_api+'etnico').pipe(catchError(this.handleError));
  } 
  public getEstadoCivil(): Observable<mEstadoCivil[]> {
    return this.http.get<mEstadoCivil[]>(this.url_api+'estadocivil').pipe(catchError(this.handleError));
  } 




  public getMuniID(id:any): Observable<mMunicipio[]> {
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return this.http.post<mMunicipio[]>(this.url_api+'municipio',{id:id},httpOptions).pipe(catchError(this.handleError));
  } 


  public getReligion(): Observable<mReligion[]> {
    
    return this.http.get<mReligion[]>(this.url_api+'religion').pipe(catchError(this.handleError));
  } 

  
  public getGrados(): Observable<mGrado[]> {
    
    return this.http.get<mGrado[]>(this.url_api+'grados').pipe(catchError(this.handleError));
  } 

  public login(email:string,password:string): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };    
    return this.http.post<any>(this.url_api+'auth',{cuenta:email,password:password},httpOptions).pipe(      
      tap(async (res: any) => {       
        if(res){
        this.extractData(res);     
        }else{
          
        }
      }),
      catchError((e: any) =>{        
        return throwError(e);
      })
    );
  }

//admision
  public nuevoAlumno(formData): Observable<any>{
   
    return this.http.post(this.url_api+'NuevoAlumno', formData);
  }


  public ObtenerFoto(path1): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }; 
    return this.http.post<any>(this.url_api+'FotoID',{path:path1},httpOptions);
  }

  public RefreshToken(user): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }; 
    return this.http.post<any>(this.url_api+'Refresh',{usuario:user},httpOptions);
  }


  public ValCodigo(cod): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }; 
    return this.http.post<any>(this.url_api+'ValCodigo',{codigo:cod},httpOptions);
  }


  public ValCorreo(cod): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }; 
    return this.http.post<any>(this.url_api+'ValCorreo',{correo:cod},httpOptions);
  }

  public CrearCuenta(cuenta): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    
    return  this.http.post<any>(this.url_api+'CrearCuenta',cuenta,httpOptions).pipe(catchError(this.handleError));
  }

  public ActualizarPassUsuarios(id,cuenta): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    
    return  this.http.post<any>(this.url_api+'ActualizarPassUsuario',{usuid:id,cuenta},httpOptions).pipe(catchError(this.handleError));
  }


  public ObtenerCodigo(): Observable<any>{
    
    return  this.http.get<any>(this.url_api+'Ciclo').pipe(catchError(this.handleError));
  }

  public ObtenerListadoAlumnos(usuario): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api+'ListadoAlumnos',{id:usuario},httpOptions).pipe(catchError(this.handleError));
  }

  public ObtenerAlumno(alumno): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api+'AlumnoID',{id:alumno},httpOptions).pipe(catchError(this.handleError));
  }

  public ActualizarAlumnoTodo(formData): Observable<any>{
   
    return this.http.post(this.url_api+'ActualizacionNormal', formData);
  }
  public ActualizarAlumnoSinFoto(formData): Observable<any>{
   
    return this.http.post(this.url_api+'ActualizacionSinFoto', formData);
  }


  public Direccion(muni,dep): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }; 
    return this.http.post(this.url_api+'direccion', {muni:muni,dep:dep},httpOptions);
  }


//Inscripcion


public ObtenerAlumnoCod(alumno): Observable<any>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  return  this.http.post<any>(this.url_api+'AlumnoCod',{codigo:alumno},httpOptions).pipe(catchError(this.handleError));
}

public ObtenerEstudianteCod(alumno): Observable<any>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  return  this.http.post<any>(this.url_api+'EstudianteID',{codigo:alumno},httpOptions).pipe(catchError(this.handleError));
}

public ObtenerEstudiantePreInscripcion(alumno): Observable<any>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  return  this.http.post<any>(this.url_api+'ObtenerEstudiantePreInscripcion',{codigo:alumno},httpOptions).pipe(catchError(this.handleError));
}



public InscribirEstudiante(alumno): Observable<any>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  
  return  this.http.post<any>(this.url_api+'InscribirEstudiante',alumno,httpOptions).pipe(catchError(this.handleError));
}



public ActualizarEstudiante(alumno): Observable<any>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  
  return  this.http.post<any>(this.url_api+'EstudianteACT',alumno,httpOptions).pipe(catchError(this.handleError));
}


public ObtenerListadoEstudiantes(usuario): Observable<any[]>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  return  this.http.post<any[]>(this.url_api+'ListadoEstudiantes',{usu:usuario},httpOptions).pipe(catchError(this.handleError));
}



public ObtenerListadoEstudiantesReinscripcion(usuario): Observable<any[]>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  return  this.http.post<any[]>(this.url_api+'ListadoReinscribir',{usu:usuario},httpOptions).pipe(catchError(this.handleError));
}



public ReinscribirEstudiante(alumno): Observable<any>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  
  return  this.http.post<any>(this.url_api+'ReinscribirEstudiante',alumno,httpOptions).pipe(catchError(this.handleError));
}

public RecuperarPassword(alumno): Observable<any>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  
  return  this.http.post<any>(this.url_api+'RecuperarPassword',alumno,httpOptions).pipe(catchError(this.handleError));
}

public RecuperarCorreo(codigo): Observable<any>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  
  return  this.http.post<any>(this.url_api+'ObtenerCorreo',{codigo:codigo},httpOptions).pipe(catchError(this.handleError));
}



//PREINSCRIBIR
public ObtenerListadoEstudiantesPReinscripcion(usuario): Observable<any[]>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  return  this.http.post<any[]>(this.url_api+'EstudiantesPREinscripcion',{usu:usuario},httpOptions).pipe(catchError(this.handleError));
}

public ObtenerListadoEstudiantesPReinscritos(usuario): Observable<any[]>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  return  this.http.post<any[]>(this.url_api+'ObtenerEstudiantesPReInscritos',{usu:usuario},httpOptions).pipe(catchError(this.handleError));
}
public InsertarEstudiantesPReinscripcion(usuario): Observable<any[]>{  
  const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };   
  return  this.http.post<any[]>(this.url_api+'EstudianteInsertarPREinscripcion',usuario,httpOptions).pipe(catchError(this.handleError));
}

//DESCARGAR ARCHIVOS
public DescargarAnexo(): Observable<any>{  
  
  return  this.http.get(this.url_api+'GETANEXO',{responseType:'blob'}).pipe(catchError(this.handleError));
}


///cambiar a Fase2 activo
public BloquearFase2(codigo): Observable<any> {
  const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  return this.http.post<any>(this.url_api+'BloquearFase2',{id:codigo,observacion:"Boleta Descargada"},httpOptions).pipe(catchError(this.handleError));
}  

public DescargarBoleta(): Observable<any>{  
  
  return  this.http.get(this.url_api+'GETBOLETA',{responseType:'blob'}).pipe(catchError(this.handleError));
}


///cambiar fase 3

public IngresoBoleta(formData): Observable<any>{
   
  return this.http.post(this.url_api+'BloquearFase3', formData);
}


////COMPROMISO
public Compromiso(codigo): Observable<any> {
  const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  return this.http.post<any>(this.url_api+'Descargar_Compromiso',{id:codigo},httpOptions).pipe(catchError(this.handleError));
}  

public Contrato(codigo): Observable<any> {
  const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  return this.http.post<any>(this.url_api+'Descargar_Contrato',{id:codigo},httpOptions).pipe(catchError(this.handleError));
}  

public Constancia(codigo): Observable<any> {
  const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
  return this.http.post<any>(this.url_api+'Descargar_Constancia',{id:codigo},httpOptions).pipe(catchError(this.handleError));
}  

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  //Fechas Importantes
  public ObtenerFechaPreInscripcion(): Observable<any>{  
  
    return  this.http.get(this.url_api+'ObtenerFechaPreInscripcion').pipe(catchError(this.handleError));
  }
  public ObtenerFechaReInscripcion(): Observable<any>{  
  
    return  this.http.get(this.url_api+'ObtenerFechaReInscripcion').pipe(catchError(this.handleError));
  }
  public ObtenerFechaInscripcion(): Observable<any>{  
  
    return  this.http.get(this.url_api+'ObtenerFechaInscripcion').pipe(catchError(this.handleError));
  }
  public ObtenerFechaAdmision(): Observable<any>{  
  
    return  this.http.get(this.url_api+'ObtenerFechaAdmision').pipe(catchError(this.handleError));
  }

  public ObtenerFechaGrupoPastoral(): Observable<any>{  
  
    return  this.http.get(this.url_api+'ObtenerFechaGrupoPastoral').pipe(catchError(this.handleError));
  }

  public ObtenerFechaGrupoSacramental(): Observable<any>{  
  
    return  this.http.get(this.url_api+'ObtenerFechaGrupoSacramental').pipe(catchError(this.handleError));
  }

  public ObtenerFechaBoletin(): Observable<any>{  
  
    return  this.http.get(this.url_api+'ObtenerFechaBoletin').pipe(catchError(this.handleError));
  }
  
  public ObtenerFechaBtnPreinscripcion(): Observable<any>{  
  
    return  this.http.get(this.url_api+'ObtenerFechaBtnPreinscripcion').pipe(catchError(this.handleError));
  }

  public ListarBoletasPagoMensual(id): Observable<any> {
    return this.http.get<any>(this.url_api + 'ListarBoletaPagoMensualEstudiante/'+id).pipe(catchError(this.handleError));
  }

  public InsertarBoletaPagoMensual(grado,mes,estudiante,ruta): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.url_api + 'InsertarBoletaPagoMensual', { grado:grado,mes:mes,estudiante:estudiante,ruta:ruta }, httpOptions).pipe(catchError(this.handleError));

  }

  public AdjuntarBoletaPagoMensual(formData): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'})
    };   
   
    return this.http.post(this.url_api_adjuntos+'Boletas/AdjuntarBoletaPagoMensual', formData);
  }

  public BoletaAuxiliar(codigo): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
    return this.http.post<any>(this.url_api+'BoletaPagoAuxiliar',{id:codigo,observacion:"Boleta Descargada"},httpOptions).pipe(catchError(this.handleError));
  }  
  
  public DescargarBoletaAuxiliar(): Observable<any>{  
    
    return  this.http.get(this.url_api+'GETBOLETA',{responseType:'blob'}).pipe(catchError(this.handleError));
  }
}