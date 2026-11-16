import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-pastoral-menu',
  templateUrl: './pastoral-menu.component.html',
  styleUrls: ['./pastoral-menu.component.css']
})
export class PastoralMenuComponent implements OnInit {

  constructor(private tokenStorage: TokenStorageService,private auth: AuthService,private api: ApiService) { }

  grupo_pastoral=false;
  grupo_sacramental=false;

  ngOnInit(): void {

    this.api.getCiclo().subscribe((data)=>{
      this.api.ObtenerFechaGrupoPastoral().subscribe((data1)=>{
        this.grupo_pastoral = data1.vigente;
      })
      this.api.ObtenerFechaGrupoSacramental().subscribe((data1)=>{
        this.grupo_sacramental = data1.vigente;
      })

    })


  }

}
