import { Component, OnInit } from '@angular/core';
import { AcademicoService } from 'src/Services/academico.services';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { ReportesService } from 'src/Services/reportes.services';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-estadocuenta',
  templateUrl: './estadocuenta.component.html',
  styleUrls: ['./estadocuenta.component.css']
})
export class EstadocuentaComponent implements OnInit {

  constructor(private reportes:ReportesService,private api: AcademicoService, private auth: AuthService, private tokenStorage: TokenStorageService,private apiservice:ApiService) { }
  year = new Date().getFullYear();
  Listado_Estudiantes = []
  validardia(valor) {

    try {
      var x = parseFloat(valor)
      if (x == 0 || x < 0) {
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


    this.api.ObtenerSaldoEstudiantes(usuid).subscribe(result => {
      this.Listado_Estudiantes = result;
      
    },
      (error: any) => {
        alert('Error al Obtener Listado de Estudiantes');
        return;
      });


  }

  descargar(codigo){

    this.apiservice.BoletaAuxiliar(codigo).subscribe((data)=>{
  
      var json_data = data
        var request = {
          template: {    
            name: 'Boleta1'    
           },     
                 data: json_data    
      };  
    
       /* this.http.post('http://34.69.167.222:5488/api/report',request,{ responseType: 'arraybuffer' }).subscribe((data)=>{
          var file = new Blob([data], { type: 'application/pdf' });
          var fileURL = URL.createObjectURL(file);
          this.downloadFile(file, "BoletadePago.pdf");
        })*/
        this.reportes.BoletaPago(data).subscribe((data)=>{
          this.reportes.DescargarBoletaPago(codigo).subscribe((data2)=>{
            saveAs(data2, 'BoletaPago-'+codigo+'.pdf');
          })
        })
  /*
      this.apiservice.DescargarBoleta().subscribe((data)=>{
        saveAs(data, 'BoletadePago.pdf')
        location.reload();
      })
      
  */
    })
  
  
   }

}
