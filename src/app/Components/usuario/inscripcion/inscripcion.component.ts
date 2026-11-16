import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

  isLoggedIn = false;

  constructor(private tokenStorage: TokenStorageService, private auth: AuthService, private api: ApiService) { }
  ciclo;
  reinscribir = false;
  pre_inscribir = false;
  re_inscribir = false;
  inscribir = false;
  admision = false;
  ngOnInit(): void {

    this.auth.RevalSesion();

    var usuid = this.tokenStorage.getUser().usu_cuenta.toString().substring(0, 2);

    this.api.getCiclo().subscribe((data) => {
      this.api.ObtenerFechaPreInscripcion().subscribe((data1) => {
        this.pre_inscribir = data1.vigente;
      })
      this.api.ObtenerFechaInscripcion().subscribe((data1) => {
        this.inscribir = data1.vigente;
      })
      this.api.ObtenerFechaAdmision().subscribe((data1) => {
        this.admision = data1.vigente;
      })
      this.api.ObtenerFechaReInscripcion().subscribe((data1) => {
        this.re_inscribir = data1.vigente;
      })
      this.ciclo = data.ciclo_ciclo.toString().substring(2, 4);
      if (usuid == this.ciclo) {

        this.reinscribir = false;
      } else {

        this.reinscribir = true;
      }

    })

  }

}
