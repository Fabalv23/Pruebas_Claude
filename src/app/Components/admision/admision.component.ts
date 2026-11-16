import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { AuthService } from 'src/Services/auth.service';
import { mAlumno } from 'src/models/mAlumno';
import { ApiService } from 'src/Services/api.services';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-admision',
  templateUrl: './admision.component.html',
  styleUrls: ['./admision.component.css']
})
export class AdmisionComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,private auth: AuthService,private apiservice:ApiService) { }

  ListadoAlumnos:mAlumno[];


  ngOnInit(): void {

   this.auth.RevalSesion();

   var usuid = this.tokenStorage.getUser().usu_id;
  


   this.apiservice.ObtenerListadoAlumnos(usuid)
   .subscribe(result => {
     this.ListadoAlumnos = result
   },
   (error: any) => {
       alert('Error al Obtener Listado de Alumnos');
       return;
   });   




  }

  Descargar(){    
   this.apiservice.DescargarAnexo().subscribe((data)=>saveAs(data, 'SolicitudAdmisionesSegundaParte.pdf'))
  }

  public workStatuses = [
    { id: 0, description: 'unknow' },
    { id: 1, description: 'student' },
    { id: 2, description: 'unemployed' },
    { id: 3, description: 'employed' }
  ];
  public contact = { name: '', isVIP: false, gender: '', workStatus: 0 };



}
