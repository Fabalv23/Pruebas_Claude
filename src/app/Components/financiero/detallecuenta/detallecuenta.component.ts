import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademicoService } from 'src/Services/academico.services';
import { AuthService } from 'src/Services/auth.service';
import { TokenStorageService } from 'src/Services/token-storage.service';

@Component({
  selector: 'app-detallecuenta',
  templateUrl: './detallecuenta.component.html',
  styleUrls: ['./detallecuenta.component.css']
})
export class DetallecuentaComponent implements OnInit {

  constructor(private api:AcademicoService,private auth:AuthService,private tokenStorage:TokenStorageService,private route:ActivatedRoute) { }

  Listado_Estudiantes = []
  validardia(valor) {

    try {
      var x = parseFloat(valor)
      if (x == 0) {
        return true
      }
    } catch (error) {
      return false;

    }

    return false;


  }
  ngOnInit(): void {

      this.auth.RevalSesion();
      var usuid = this.tokenStorage.getUser().usu_id;

      var id_est = this.route.snapshot.paramMap.get('id');

    this.api.ObtenerDetalleEstadoCuenta(id_est).subscribe(result => {
      this.Listado_Estudiantes = result; 
   
    },
    (error: any) => {
        alert('Error al Obtener Listado de Estudiantes');
        return;
    }); 


  }

}
