import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { ApiService } from 'src/Services/api.services';
import { mEstudiante } from 'src/models/mEstudiante';
import { validar_inscripcion } from 'src/models/validar_inscripcion';
import { AuthService } from 'src/Services/auth.service';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { ReportesService } from 'src/Services/reportes.services';
@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})
export class InscripcionComponent implements OnInit {

  constructor(private reportes:ReportesService,private http:HttpClient,private tokenStorage:TokenStorageService,private apiservice:ApiService,private auth:AuthService) {

    


   }

   ListadoEstudiantes:any[];
  private Fases = new Array();


//Buscar fase 

//Fase1=false;
downloadFile(blob, fileName){
  const link = document.createElement('a');
  // create a blobURI pointing to our Blob
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  // some browser needs the anchor to be in the doc
  document.body.append(link);
  link.click();
  link.remove();
  // in case the Blob uses a lot of memory
  setTimeout(() => URL.revokeObjectURL(link.href), 7000);
};
 descargar(codigo){

  this.apiservice.BloquearFase2(codigo).subscribe((data)=>{

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

 descargar1(codigo){

  this.apiservice.Compromiso(codigo).subscribe((data)=>{

    var json_data = data
      var request = {
        template: {    
          name: 'CompromisoPadre'    
         },     
               data: json_data    
    };  
  
     /* this.http.post('http://34.69.167.222:5488/api/report',request,{ responseType: 'arraybuffer' }).subscribe((data)=>{
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        this.downloadFile(file, "CompromisoPadreFamilia.pdf");
      })*/
      this.reportes.CompromisoPPFF(data).subscribe((data)=>{
        this.reportes.DescargarCompromisoPPFF(codigo).subscribe((data2)=>{
          saveAs(data2, 'CompromisoPPFF-'+codigo+'.pdf');
        })
      })
  })


 }

 descargar2(codigo){

  this.apiservice.Contrato(codigo).subscribe((data)=>{

    var json_data = data
      var request = {
        template: {    
          name: 'ContratoPadre'    
         },     
               data: json_data    
    };  
  
   /*   this.http.post('http://34.69.167.222:5488/api/report',request,{ responseType: 'arraybuffer' }).subscribe((data)=>{
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        this.downloadFile(file, "ContratoAdhesión.pdf");
      })*/

      this.reportes.ContratoPPFF(data).subscribe((data)=>{
        this.reportes.DescargarContratoPPFF(codigo).subscribe((data2)=>{
          saveAs(data2, 'Contrato-'+codigo+'.pdf');
        })
      })
  })


 }


 
 descargar3(codigo){

  this.apiservice.Constancia(codigo).subscribe((data)=>{

    var json_data = data
      var request = {
        template: {    
          name: 'ConstanciaInscripcion'    
         },     
               data: json_data    
    };  
  
  /*    this.http.post('http://34.69.167.222:5488/api/report',request,{ responseType: 'arraybuffer' }).subscribe((data)=>{
        var file = new Blob([data], { type: 'application/pdf' });
        var fileURL = URL.createObjectURL(file);
        this.downloadFile(file, "ConstanciaInscripcion2021.pdf");
      })
      */

      this.reportes.ConstanciaInscripcion(data).subscribe((data)=>{
        this.reportes.DescargarConstanciaInscripcion(codigo).subscribe((data2)=>{
          saveAs(data2, 'ConstanciaInscripción-'+codigo+'.pdf');
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

 Subir(codigo){

  this.apiservice.BloquearFase2(codigo).subscribe((data)=>{

    this.apiservice.DescargarBoleta().subscribe((data)=>{
      saveAs(data, 'BoletadePago.pdf')
      location.reload();
    })
    

  })


 }


  ngOnInit(): void {
    
    this.auth.RevalSesion();

    var usuid = this.tokenStorage.getUser().usu_id;

    this.apiservice.ObtenerListadoEstudiantes(usuid)
    .subscribe(result => {
      this.ListadoEstudiantes = result; 
    
      
      
    },
    (error: any) => {
        alert('Error al Obtener Listado de Alumnos');
        return;
    });   
    
    
  }

}
