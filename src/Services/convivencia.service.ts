import { Injectable } from "@angular/core";
import { usuario } from "../models/usuarios";
import { mSexo } from "../models/mSexo";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { throwError } from 'rxjs';
import { retry, catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ConvivenciaService {
  private user: usuario = { id_usuario: "", email: "", nombre: "", password: "" };
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

  public ObtenerPeriodos(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(this.url_api + 'ObtenerPeriodos').pipe(catchError(this.handleError));
  }

  public ObtenerClaseExcusa(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(this.url_api + 'ObtenerClaseExcusa').pipe(catchError(this.handleError));
  }

  public ObtenerTipoExcusa(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.get<any>(this.url_api + 'ObtenerTipoExcusa').pipe(catchError(this.handleError));
  }
  public InsertarExcusaIndividual(formData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>' })
    };

    return this.http.post(this.url_api + 'InsertarExcusaIndividual', formData).pipe(catchError(this.handleError));
  }


  public ObtenerExcusasEstudiantes(codigo): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.url_api + 'ObtenerExcusasEstudiante', { codigo }, httpOptions);
  }

  public AdjuntarArchivoExcusa(formData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>' })
    };

    return this.http.post(this.url_api_adjuntos + 'Excusas/AdjuntarExcusa', formData);
  }



  public AnularExcusaIndividual(id, tipo): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };


    return this.http.post(this.url_api + 'AnularExcusaIndividual', { id: id, tipo: tipo }, httpOptions);
  }

  public ObtenerHistorialAsistenciaEstudiante(data): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(this.url_api + 'HistorialAsistenciaEstudiante', {
      codigo: data.codigo,
      fecha_unica: data.fecha_unica, fecha_inicio: data.fecha_inicio, fecha_fin: data.fecha_fin
    }, httpOptions).pipe(catchError(this.handleError));
  }

  public ObtenerListadoEstudiantesPresencial(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };


    return this.http.get(this.url_api + 'ObtenerListadoEstudiantesPresencial').pipe(catchError(this.handleError));
  }

  constructor(private http: HttpClient, private router: Router) { }


  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


}