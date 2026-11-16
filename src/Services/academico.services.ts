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
export class AcademicoService {
  private user: usuario = { id_usuario: "",email:"", nombre: "",password:""};
  //private url_api = "http://35.226.199.141:5000/api/v1/"; // URL to web api
  //private url_api = "http://localhost:3000/api/v1/"; // URL to web api
  private url_api = environment.server;
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


  public ObtenerListadoEstudiantes(usuario): Observable<any[]>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any[]>(this.url_api+'GetEstudiantesInscritos',{usu:usuario},httpOptions).pipe(catchError(this.handleError));
  }
  
  public ObtenerListadoClasesEstudiantes(usuario): Observable<any[]>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any[]>(this.url_api+'GetClasesEstudiante',{id:usuario},httpOptions).pipe(catchError(this.handleError));
  }
  
  public ObtenerListadoTareasEstudiantes(usuario): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api+'GetTareasEstudiante',{curso:usuario},httpOptions).pipe(catchError(this.handleError));
  }
  
  public ObtenerDetalleTarea(alumno,material): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api+'GetDetalleTarea',{id:alumno,trabajo:material},httpOptions).pipe(catchError(this.handleError));
  }
  
  public ObtenerCuadroResumen(curso,estudiante): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api+'GetCuadroResumenEstudiante',{curso:curso,estudiante:estudiante},httpOptions).pipe(catchError(this.handleError));
  }

  public ObtenerCuadroResumenEstudianteLista(curso,estudiante): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api+'ObtenerCuadroResumenEstudianteLista',{curso:curso,estudiante:estudiante},httpOptions).pipe(catchError(this.handleError));
  }




  public ObtenerListadoProfesores(): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.get<any>(this.url_api+'ListProfesores').pipe(catchError(this.handleError));
  }
  
  




  //Financiero
  
  public ObtenerSaldoEstudiantes(id): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api+'ObtenerSaldoEstudiantesv2',{id:id},httpOptions).pipe(catchError(this.handleError));
  }

  public ObtenerSaldoEstudiantev2(codigo): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api+'ObtenerSaldoEstudiantev2',{codigo:codigo},httpOptions).pipe(catchError(this.handleError));
  }



  public ObtenerDetalleEstadoCuenta(id): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api+'ObtenerDetalleEstadoCuenta',{id:id},httpOptions).pipe(catchError(this.handleError));
  }

  public ObtenerEstadoCuentaCicloActual(id): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api+'ObtenerEstadoCuentaCicloActual',{id:id},httpOptions).pipe(catchError(this.handleError));
  }

  public ListarHorarioEstudiante(id): Observable<any> {
    return this.http.get<any>(this.url_api + 'ListarHorarioEstudiante/'+id).pipe(catchError(this.handleError));
  }

  public ObtenerBoletinEstudiantePorGrado(grado,estudiante,unidad): Observable<any>{
    return  this.http.get<any>(this.url_api+'ObtenerConsolidadoBoletinEstudianteIndividual/'+grado+'/'+estudiante+'/'+unidad).pipe(catchError(this.handleError));
  }

  public ObtenerValidacionesBoletin(codigo): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
    return this.http.post<any>(this.url_api+'ObtenerValidacionesBoletin',{codigo:codigo},httpOptions).pipe(catchError(this.handleError));
  }  

  public ObtenerCantidadMateriasOficiales(grado): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.url_api + 'ObtenerCantidadMateriasOficiales', { grado:grado }).pipe(catchError(this.handleError));
  }


  public ObtenerBoletinRecuperacionEstudiantePorGrado(grado,estudiante): Observable<any>{
    return  this.http.get<any>(this.url_api+'ObtenerConsolidadoRecuperacionEstudiante/'+grado+'/'+estudiante).pipe(catchError(this.handleError));
  }


  constructor(private http: HttpClient,private router: Router) {}


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


}