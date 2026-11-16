import { Injectable } from '@angular/core';
import { usuario } from '../models/usuarios';
import { mSexo } from '../models/mSexo';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PastoralService {
  private user: usuario = {
    id_usuario: '',
    email: '',
    nombre: '',
    password: '',
  };
  //private url_api = "http://35.226.199.141:5000/api/v1/"; // URL to web api
  //private url_api = "http://localhost:3000/api/v1/"; // URL to web api
  private url_api = environment.server;
  private url_api_adjuntos = environment.archivos;

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

  public ObtenerGrupoPastoral(categoria): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return  this.http.get<any>(this.url_api+'ObtenerGrupoPastoral'+'/'+categoria).pipe(catchError(this.handleError));
  }

  public InsertarEstudianteGrupoPastoral(clase): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .post(this.url_api + 'InsertarEstudianteGrupoPastoral', { clase }, httpOptions)
      .pipe(catchError(this.handleError));
  }

  public ObtenerGrupoPastoralEstudiante(categoria,usu_id): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };
    return  this.http.get<any>(this.url_api+'ObtenerGrupoPastoralEstudiante'+'/'+categoria+'/'+usu_id).pipe(catchError(this.handleError));
  }

  public EliminarGrupoPastoralEstudiante(id, categoria): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http
      .delete(this.url_api + 'EliminarGrupoPastoralEstudiante/' + id + '/' + categoria)
      .pipe(catchError(this.handleError));
  }


  public Constancia(codigo): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
    return this.http.post<any>(this.url_api+'DescargarConstanciaPastoral',{id:codigo},httpOptions).pipe(catchError(this.handleError));
  }  

  public adjuntoCoditoGrupoPastoral(id,categoria,ruta): Observable<any> {
    const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
    return this.http.post<any>(this.url_api+'AdjuntarCoditoGrupoPastoral',{id:id,categoria:categoria,ruta:ruta},httpOptions).pipe(catchError(this.handleError));
  }  
  

  public AdjuntarAutorizacionGrupoPastoral(formData): Observable<any>{  
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'})
    };   
   
    return this.http.post(this.url_api_adjuntos+'Boletas/AdjuntarAutorizacionGrupoPastoral', formData);
  }
  constructor(private http: HttpClient, private router: Router) {}
}
