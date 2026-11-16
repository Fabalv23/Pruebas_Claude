import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Services/api.services';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private api: ApiService,private tokenStorage:TokenStorageService) { }

  ciclo;
  reinscribir=false;

  pre_inscribir=false;
  re_inscribir=false;
  inscribir=false;
  admision=false;
  boletin=false;

  ngOnInit(): void {

   
    var usuid = this.tokenStorage.getUser().usu_cuenta.toString().substring(0,2);

    this.api.getCiclo().subscribe((data)=>{
      this.api.ObtenerFechaPreInscripcion().subscribe((data1)=>{
        this.pre_inscribir = data1.vigente;
      })
      this.api.ObtenerFechaInscripcion().subscribe((data1)=>{
        this.inscribir = data1.vigente;
      })
      this.api.ObtenerFechaAdmision().subscribe((data1)=>{
        this.admision = data1.vigente;
      })
      this.api.ObtenerFechaReInscripcion().subscribe((data1)=>{
        this.re_inscribir = data1.vigente;
      })

      this.api.ObtenerFechaBoletin().subscribe((data1)=>{
        this.boletin = data1.vigente;
      })
        
      this.ciclo = data.ciclo_ciclo.toString().substring(2,4);   
      if(usuid==this.ciclo){
        
        this.reinscribir=false;
      }else{
        
        this.reinscribir=true;
      }

    })

  }

}
