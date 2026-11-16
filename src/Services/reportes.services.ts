import { Injectable } from "@angular/core";
import { usuario  } from "../models/usuarios";
import { mSexo  } from "../models/mSexo";
import { HttpClient,HttpErrorResponse,HttpHeaders, HttpParams  } from "@angular/common/http";
import { Observable } from "rxjs";
import {  throwError } from 'rxjs';
import { retry, catchError,map,tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import {environment} from '../environments/environment'

@Injectable({
  providedIn: "root"
})
export class ReportesService {
    private user: usuario = { id_usuario: "",email:"", nombre: "",password:""};
  //private url_api = "http://35.226.199.141:5000/api/v1/"; // URL to web api
  private url_api = environment.reportes+"/Financiera/"; // URL to web api
  private url_api_inscripcion = environment.reportes+"/Inscripcion/"; // URL to web api
  private url_api_pre_inscripcion = environment.reportes+"/PreInscripcion/"; // URL to web api

  private url_api_inscripcion_constancias = environment.reportes+"/Constancias/"; // URL to web api

  //private url_api = environment.server;
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

  public ReporteEstudianteSaldos(datos): Observable<any>{  

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api+'SaldosEstudiante',datos,httpOptions).pipe(catchError(this.handleError));
  }


  public DescargarReporteEstudianteSaldos(id): Observable<any>{  
    let parametros = new HttpParams();
    parametros = parametros.append('id',id);

    const httpOptions = {
        params: parametros
    };  
   
    return  this.http.get(this.url_api+'SaldosEstudiante/'+id,{responseType:'blob'}).pipe(catchError(this.handleError));
  }
  
  public CompromisoPPFF(datos): Observable<any>{  

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api_inscripcion+'CompromisoPPFF',datos,httpOptions).pipe(catchError(this.handleError));
  }


  public DescargarCompromisoPPFF(id): Observable<any>{  
    let parametros = new HttpParams();
    parametros = parametros.append('id',id);

    const httpOptions = {
        params: parametros
    };  
   
    return  this.http.get(this.url_api_inscripcion+'CompromisoPPFF/'+id,{responseType:'blob'}).pipe(catchError(this.handleError));
  }

  public ContratoPPFF(datos): Observable<any>{  

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api_inscripcion+'Contrato',datos,httpOptions).pipe(catchError(this.handleError));
  }


  public DescargarContratoPPFF(id): Observable<any>{  
    let parametros = new HttpParams();
    parametros = parametros.append('id',id);

    const httpOptions = {
        params: parametros
    };  
   
    return  this.http.get(this.url_api_inscripcion+'Contrato/'+id,{responseType:'blob'}).pipe(catchError(this.handleError));
  }
  
  public BoletaPago(datos): Observable<any>{  

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api_inscripcion+'BoletaPago',datos,httpOptions).pipe(catchError(this.handleError));
  }


  public DescargarBoletaPago(id): Observable<any>{  
    let parametros = new HttpParams();
    parametros = parametros.append('id',id);

    const httpOptions = {
        params: parametros
    };  
   
    return  this.http.get(this.url_api_inscripcion+'BoletaPago/'+id,{responseType:'blob'}).pipe(catchError(this.handleError));
  }

    public BoletaPagoPre(datos): Observable<any>{  

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api_pre_inscripcion+'BoletaPagoPre',datos,httpOptions).pipe(catchError(this.handleError));
  }


  public DescargarBoletaPagoPre(id): Observable<any>{  
    let parametros = new HttpParams();
    parametros = parametros.append('id',id);

    const httpOptions = {
        params: parametros
    };  
   
    return  this.http.get(this.url_api_pre_inscripcion+'BoletaPagoPre/'+id,{responseType:'blob'}).pipe(catchError(this.handleError));
  }

  public ConstanciaInscripcion(datos): Observable<any>{  

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api_inscripcion+'ConstanciaInscripcion',datos,httpOptions).pipe(catchError(this.handleError));
  }


  public DescargarConstanciaInscripcion(id): Observable<any>{  
    let parametros = new HttpParams();
    parametros = parametros.append('id',id);

    const httpOptions = {
        params: parametros
    };  
   
    return  this.http.get(this.url_api_inscripcion+'ConstanciaInscripcion/'+id,{responseType:'blob'}).pipe(catchError(this.handleError));
  }


  public ConstanciaInscripcionPastoralComunion(datos): Observable<any>{  

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api_inscripcion_constancias+'ObtenerConstanciaPastoralComunion',datos,httpOptions).pipe(catchError(this.handleError));
  }

  public DescargarConstanciaInscripcionPastoralComunion(id): Observable<any>{  
    let parametros = new HttpParams();
    parametros = parametros.append('id',id);

    const httpOptions = {
        params: parametros
    };  
   
    return  this.http.get(this.url_api_inscripcion_constancias+'ObtenerConstanciaPastoralComunion/'+id,{responseType:'blob'}).pipe(catchError(this.handleError));
  }
  

  public ConstanciaInscripcionPastoralConfirmacion(datos): Observable<any>{  

    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    };   
    return  this.http.post<any>(this.url_api_inscripcion_constancias+'ObtenerConstanciaPastoralConfirmacion',datos,httpOptions).pipe(catchError(this.handleError));
  }

  public DescargarConstanciaInscripcionPastoralConfirmacion(id): Observable<any>{  
    let parametros = new HttpParams();
    parametros = parametros.append('id',id);

    const httpOptions = {
        params: parametros
    };  
   
    return  this.http.get(this.url_api_inscripcion_constancias+'ObtenerConstanciaPastoralConfirmacion/'+id,{responseType:'blob'}).pipe(catchError(this.handleError));
  }
  
  

  

  constructor(private http: HttpClient,private router: Router) {}


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


}