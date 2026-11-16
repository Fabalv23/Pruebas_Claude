import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import html2canvas from 'html2canvas';
import * as htmlToImage from 'html-to-image';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AcademicoService } from 'src/Services/academico.services';
import { ApiService } from 'src/Services/api.services';
import { AuthService } from 'src/Services/auth.service';
import { ConvivenciaService } from 'src/Services/convivencia.service';
import { ReportesService } from 'src/Services/reportes.services';
import { TokenStorageService } from 'src/Services/token-storage.service';
@Component({
  selector: 'app-boletin-detalle',
  templateUrl: './boletin-detalle.component.html',
  styleUrls: ['./boletin-detalle.component.css']
})
export class BoletinDetalleComponent implements OnInit {
  cantidad = 0;
  unidades4=false;
  unidades3=false;
  recuperacion_habilitado=false;
  unidad_default = true;
  ultima_unidad_habilitada = false;
  clave_seleccionada = 0;
  grado_select = 0;
  codigo_select = "";
  data = [];

  grados = [];

  notas_consolidado = [];
  materias = [];
  materias_promedio = [];
  materias_hijo = [];
  spinner = false;
  mostrar = false;
  unidad_select = "";
  avance = 0;

  habilitado = false;
  pedagogia = false;
  convivencia = false;
  solvencia = false;
  
  habilitado_pedagogia = false;
  cantidad_maxima_permitida = 0;

  constructor(private apiservice: ApiService,
    private auth: AuthService, private api_reportes: ReportesService,
    private tokenStorage: TokenStorageService, private api_convivencia: ConvivenciaService, private fb: FormBuilder, private route: ActivatedRoute, private api_academico: AcademicoService) { }

  ngOnInit(): void {
    this.auth.RevalSesion();

    this.codigo_select = this.route.snapshot.paramMap.get('codigo');
     this.grado_select = parseInt(this.route.snapshot.paramMap.get('grado'));

     this.api_academico.ObtenerCantidadMateriasOficiales(this.grado_select).subscribe((data) => {
      console.log(data);
      this.cantidad_maxima_permitida = data;

    });
     this.api_academico.ObtenerValidacionesBoletin( this.codigo_select).subscribe((data) => {
      console.log(data);
      this.convivencia = data.convivencia;
      this.solvencia = data.solvencia;
      this.habilitado_pedagogia = data.pedagogia;
      this.BuscarGrado();
      this.BuscarUnidad(data.unidad);



     }, (error) => {
      

     });





  }
  images = [];

  getBase64Image(img) {
    var canvas = document.createElement("canvas");
    console.log("image");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
  }
  download() {


  }

  AsignarClave(val){
    console.log(val);
    this.clave_seleccionada = val;
  }

  debugBase64(base64URL) {
    var win = window.open();
    win.document.write('<iframe src="' + base64URL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  }


  BuscarGrado() {

    if(this.grado_select == 15 || this.grado_select == 17 || this.grado_select==27){ //cambiar por obtener grados con 3 unidades
      this.unidades3 = true;
      this.unidades4 = false;

    }else{
      this.unidades3 = false;
      this.unidades4 = true;
    }

  }

  seccion_select = "";

  BuscarSeccion(val) {
    this.seccion_select = val;
    this.data = [];
    this.unidad_default = true;
  }

  BuscarUnidad(unidad) {
    if(unidad=="RECUPERACIÓN"){
      this.spinner = true;
      this.recuperacion_habilitado = true;
      this.api_academico.ObtenerBoletinRecuperacionEstudiantePorGrado(this.grado_select, this.codigo_select).subscribe(async (data) => {
        console.log(data);
        if (data.length > 0) {
          this.unidad_select = unidad;
          this.mostrar = true;
          this.spinner = false;
          this.data = await this.format_data(data);
          //this.materias = data.materias;
          if(this.data.length>0){
          await this.validar_habilitado(unidad);
          }else{
            this.mostrar = false;
            this.spinner = false;
            alert("No se encontraron datos para los valores seleccionados");
            return;
          }

        } else {
          this.mostrar = false;
          this.spinner = false;
          alert("No se encontraron datos para los valores seleccionados");
          return;
        }
      }, (error) => {
        this.spinner = false;
        alert("Error al cargar los datos");
        return;
      });
    }else {
    this.spinner = true;
    this.unidad_default = false;
    this.ultima_unidad_habilitada = false;
    this.api_academico.ObtenerBoletinEstudiantePorGrado(this.grado_select, this.codigo_select, unidad).subscribe(async (data) => {
      console.log(data);
      if (data.boletines.length > 0) {
        this.unidad_select = unidad;
        this.mostrar = true;
        this.spinner = false;
        this.data = data.boletines;
        this.materias = data.materias;
        await this.validar_habilitado(unidad);
        if(unidad=="UNIDAD 3" && this.unidades3 == true){
          this.ultima_unidad_habilitada = true;
        }
        if(unidad=="UNIDAD 4" && this.unidades4 == true){
          this.ultima_unidad_habilitada = true;
        } else if (unidad=="UNIDAD 4" && this.unidades3 == true){
          this.ultima_unidad_habilitada = true;
        }
      } else {
        this.mostrar = false;
        this.spinner = false;
        alert("No se encontraron datos para los valores seleccionados");
        return;
      }
    }, (error) => {
      this.spinner = false;
      alert("Error al cargar los datos");
      return;
    });
  }
  }

  format_data(data){

    var boletines = []
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      
      element.estudiantes.forEach(element => {
        boletines.push(element)
      });
      
    }

    return boletines;

  }

  suma_nota_final(val1,val2,val3,val4){

    var suma = val1+val2+val3+val4;

    return suma.toFixed();


  }

  promedio(notas) {
    console.log(notas);
    var suma = 0;

    notas.forEach(element => {

      if (element.porcentaje == "1") {
        suma = suma + element.nota;
      }

    })

    return parseInt((suma / this.materias_promedio.length).toString());
  }

  cantidad_perdidas(notas) {

    var cont = 0

    notas.forEach(element => {
      if (element.nota < 60 && element.nota > 20) {
        cont++;
      }
    });

    return cont;

  }

  validar_clases_perdidas(notas,unidad) {

    var unidad_buscar = this.obtener_campo_de_unidad(unidad);

    for (let index = 0; index < notas[0].notas.length; index++) {
      const element = notas[0].notas[index];

      if (element[unidad_buscar] < 60) {
        return true;
      }

    }

    return false;

  }


  obtener_campo_de_unidad(unidad){
    switch (unidad) {

      case "UNIDAD 1":
        return "unidad1";

        case "UNIDAD 2":
          return "unidad2";

          case "UNIDAD 3":
            return "unidad3";

            case "UNIDAD 4":
              return "unidad4";

    }
  }

  async validar_habilitado(unidad){

    if(unidad=="RECUPERACIÓN"){
      if(this.habilitado_pedagogia == true){
        for (let index = 0; index < this.data[0].notas.length; index++) {
          const element = this.data[0].notas[index];
          if(element.nota_recuperacion<60){
            this.pedagogia = true;
            break;
          }
        }
        }else{
          this.pedagogia = false;
        }
    
        this.convivencia = this.convivencia;
    
        this.solvencia = this.solvencia;
    
        if(this.pedagogia == false && this.convivencia == false && this.solvencia == false){
          this.habilitado = true;
        }
    }else {
    if(this.habilitado_pedagogia == true){
    this.pedagogia = await this.validar_clases_perdidas(this.data,unidad);
    console.log(this.pedagogia);
    }else{
      this.pedagogia = false;
    }

    this.convivencia = this.convivencia;

    this.solvencia = this.solvencia;

    if(this.pedagogia == false && this.convivencia == false && this.solvencia == false){
      this.habilitado = true;
    }
    }
  }

  @ViewChild('list') list: ElementRef;

  descargar_boletin() {
    /*var consolidado = {
      unidad: this.unidad_select,
      grado: this.grados.filter((item) => item.grad_id == this.grado_select)[0].grad_nombre,
      seccion: this.seccion_select,
      encabezado: [],
      notas: [],
      nombres: []
    };
  
    consolidado.encabezado.push({ dato: "Alumno" });
  
    this.materias.forEach(element => {
      consolidado.encabezado.push({ dato: element.nombre_materia });
    });
  
    consolidado.encabezado.push({ dato: "Cursos Perdidos" });
    consolidado.encabezado.push({ dato: "Promedio" });
  
    for (let index = 0; index < this.notas_consolidado.length; index++) {
  
      const info_estudiante = this.notas_consolidado[index];
      consolidado.nombres.push({ nombre: info_estudiante.nombre_completo });
      var estudiante_info = {
        nombre: info_estudiante.nombre_completo,
        resumen: [{ nombre: info_estudiante.nombre_completo,dato:info_estudiante.nombre_completo }]
      }
  
      for (let index = 0; index < this.materias.length; index++) {
        const materia = this.materias[index].nombre_materia;
  
        var nota = info_estudiante.notas.filter((item) => item.materia == materia);
  
        nota = parseInt(nota[0].nota);
  
        estudiante_info.resumen.push({nombre:" ", dato: nota });
      }
  
      estudiante_info.resumen.push({ nombre:"",dato: this.cantidad_perdidas(info_estudiante.notas) });
      estudiante_info.resumen.push({ nombre:"",dato: info_estudiante.promedio });
  
      consolidado.notas.push(estudiante_info);
    }*/

    /*const doc = new jsPDF('landscape', 'pt', 'Legal');
     
    const pdfTable = this.list.nativeElement;
   
    var html = htmlToPdfmake(pdfTable.innerHTML);
     
    const documentDefinition = { content: html };
    pdfMake.createPdf(documentDefinition).download(); 
  */

    var data = document.getElementById('rayado0');
    html2canvas(data, {
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
    }).then(canvas => {
      const image = canvas.toDataURL('image/jpeg', 0.5);
      console.log(canvas.width);
      console.log(canvas.height);
      const doc = new jsPDF('p', 'px', 'a4');
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;

      doc.addImage(image, 'JPEG', pageWidth * 0.15, pageHeight * 0.15, canvasWidth * 0.75, canvasHeight * 0.75);
      doc.output('dataurlnewwindow');
    });

    /*html2canvas(data).then(canvas => {
        // Few necessary setting options
       /* var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
    
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        const imageProps= pdf.getImageProperties(contentDataURL);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('new-file.pdf'); // Generated PDF
    });*/

    //console.log(JSON.stringify(consolidado));
    /* this.api_reportes.ConsolidadoGradoReporteNotas(consolidado).subscribe((data) => {
       this.api_reportes.DescargarConsolidadoGradoReporteNotas(this.grados.filter((item) => item.grad_id == this.grado_select)[0].grad_nombre,this.seccion_select).subscribe((data2) => {
         
       }, (error: any) => {
         alert('No se pudo descargar el archivo');
         
         return;
       });
     }, (error: any) => {
       alert('No se pudo generar el archivo');
       
       return;
     });*/

  }

  async descargar_boletin_varios() {
    console.log(new Date().toLocaleString())
    this.spinner = true;
    const doc = new jsPDF('p', 'px', 'a4');
    var pageWidth = doc.internal.pageSize.getWidth();
    var pageHeight = doc.internal.pageSize.getHeight();
    var img = new Image()
    img.src = 'assets/images2/fondo_boletin.png';
    var width_size = 0;
    var height_size = 0;
    //for (let index = 0; index < this.data.length; index++) {
      for (let index = 0; index < 1; index++) {

      var nombre = "rayado" + index;
      console.log(index);
      this.avance = index / this.data.length * 100;
      //console.log(nombre);
      var boletin = document.getElementById(`${nombre}`);
      if (index == 0) {

        await html2canvas(boletin, {
        }).then(canvas => {
          width_size = 956;
          height_size = canvas.height;
        });
      }
      var canvas = await this.obtener_canvas(boletin,956,height_size);
      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? widthRatio : heightRatio;

      const canvasWidth = canvas.width * widthRatio;
      const canvasHeight = canvas.height * ratio;
      //console.log(data.innerHTML);
      doc.addImage(img, 'png', 0, 0, pageWidth, pageHeight,undefined,'FAST');

      //doc.addImage(canvas, 'png', pageWidth * 0.2, pageHeight * 0.12, canvasWidth , canvasHeight * 0.4,undefined,'FAST');
      doc.addImage(canvas, 'png', pageWidth * 0.15, pageHeight * 0.13, canvasWidth , canvasHeight * 0.75,undefined,'FAST');
      this.cantidad++;
      if(index + 1 < this.data.length){
        doc.addPage('a4', 'p');
      }
    
  }
  console.log(new Date().toLocaleString())

   // doc.output('dataurlnewwindow');
    this.spinner = false;
    doc.save('Boletines-Estudiante-'+this.codigo_select+'.pdf'); // Generated PDF
    this.cantidad = 0;



    /*html2canvas(data).then(canvas => {
        // Few necessary setting options
       /* var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
    
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        const imageProps= pdf.getImageProperties(contentDataURL);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('new-file.pdf'); // Generated PDF
    });*/

    //console.log(JSON.stringify(consolidado));
    /* this.api_reportes.ConsolidadoGradoReporteNotas(consolidado).subscribe((data) => {
       this.api_reportes.DescargarConsolidadoGradoReporteNotas(this.grados.filter((item) => item.grad_id == this.grado_select)[0].grad_nombre,this.seccion_select).subscribe((data2) => {
         
       }, (error: any) => {
         alert('No se pudo descargar el archivo');
         
         return;
       });
     }, (error: any) => {
       alert('No se pudo generar el archivo');
       
       return;
     });*/

  }

  async descargar_boletin_varios_sinimagen() {
    console.log(new Date().toLocaleString())
    this.spinner = true;
    const doc = new jsPDF('p', 'pt', 'a4');
    var pageWidth = doc.internal.pageSize.getWidth();
    var pageHeight = doc.internal.pageSize.getHeight();
    var img = new Image()
    img.src = 'assets/images2/fondo_boletin.png';
    var width_size = 0;
    var height_size = 0;
    //for (let index = 0; index < this.data.length; index++) {
      for (let index = 0; index < 1; index++) {
      var nombre = "rayado" + index;
      console.log(index);
      this.avance = index / this.data.length * 100;
      //console.log(nombre);
      var boletin = document.getElementById(`${nombre}`);
      if (index == 0) {

        await html2canvas(boletin, {
        }).then(canvas => {
          //console.log(canvas);
          width_size = 956;
          height_size = canvas.height;
        });
      }
      var canvas = await this.obtener_canvas(boletin,956,height_size);
      console.log(canvas);
      const widthRatio = pageWidth / 956;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? widthRatio : heightRatio;
       
      const canvasWidth = canvas.width * widthRatio;
      const canvasHeight = canvas.height * ratio;
      //console.log(data.innerHTML);
     // doc.addImage(img, 'png', 0, 0, pageWidth, pageHeight,undefined,'FAST');

     doc.addImage(canvas, 'png', pageWidth * 0.15, pageHeight * 0.13, canvasWidth , canvasHeight * 0.75,undefined,'FAST');
     this.cantidad++;
      if(index + 1 < this.data.length){
        doc.addPage('a4', 'p');
      }
    
  }
  console.log(new Date().toLocaleString())

   // doc.output('dataurlnewwindow');
    this.spinner = false;
    doc.save('Boletines-Estudiante-'+this.codigo_select+'.pdf'); // Generated PDF
    this.cantidad = 0;




    /*html2canvas(data).then(canvas => {
        // Few necessary setting options
       /* var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
    
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        const imageProps= pdf.getImageProperties(contentDataURL);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('new-file.pdf'); // Generated PDF
    });*/

    //console.log(JSON.stringify(consolidado));
    /* this.api_reportes.ConsolidadoGradoReporteNotas(consolidado).subscribe((data) => {
       this.api_reportes.DescargarConsolidadoGradoReporteNotas(this.grados.filter((item) => item.grad_id == this.grado_select)[0].grad_nombre,this.seccion_select).subscribe((data2) => {
         
       }, (error: any) => {
         alert('No se pudo descargar el archivo');
         
         return;
       });
     }, (error: any) => {
       alert('No se pudo generar el archivo');
       
       return;
     });*/

  }

  async descargar_boletin_varios_sinimagen_alturaFija() {
    console.log(new Date().toLocaleString())
    this.spinner = true;
    const doc = new jsPDF('p', 'pt', 'a4');
    var pageWidth = doc.internal.pageSize.getWidth();
    console.log(pageWidth);
    var pageHeight = doc.internal.pageSize.getHeight();
    var img = new Image()
    img.src = 'assets/images2/fondo_boletin.png';
    var width_size = 0;
    var height_size = 0;
    for (let index = 0; index < this.data.length; index++) {
    //  for (let index = 0; index < 1; index++) {
      var nombre = "rayado" + index;
      console.log(index);
      this.avance = index / this.data.length * 100;
      //console.log(nombre);
      var boletin = document.getElementById(`${nombre}`);
      if (index == 0) {

        await html2canvas(boletin, {
        }).then(canvas => {
          //console.log(canvas);
          width_size = 956*1.10;
          height_size = canvas.height;
        });
      }
      var canvas = await this.obtener_canvas(boletin,956*1.10,height_size);
      console.log(canvas);
      const widthRatio = pageWidth / 956*1.10;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? widthRatio : heightRatio;
       
      const canvasWidth = canvas.width * widthRatio;
      const canvasHeight = canvas.height * heightRatio;
      //console.log(data.innerHTML);
     // doc.addImage(img, 'png', 0, 0, pageWidth, pageHeight,undefined,'FAST');

     doc.addImage(canvas, 'png', pageWidth * 0.10, pageHeight * 0.13, canvasWidth , canvasHeight * 0.60,undefined,'FAST');
     this.cantidad++;
      if(index + 1 < this.data.length){
        doc.addPage('a4', 'p');
      }
    
  }
  console.log(new Date().toLocaleString())

   // doc.output('dataurlnewwindow');
    this.spinner = false;
    doc.save('Boletines-Estudiante-'+this.codigo_select+'.pdf'); // Generated PDF
    this.cantidad = 0;




    /*html2canvas(data).then(canvas => {
        // Few necessary setting options
       /* var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
    
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        const imageProps= pdf.getImageProperties(contentDataURL);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('new-file.pdf'); // Generated PDF
    });*/

    //console.log(JSON.stringify(consolidado));
    /* this.api_reportes.ConsolidadoGradoReporteNotas(consolidado).subscribe((data) => {
       this.api_reportes.DescargarConsolidadoGradoReporteNotas(this.grados.filter((item) => item.grad_id == this.grado_select)[0].grad_nombre,this.seccion_select).subscribe((data2) => {
         
       }, (error: any) => {
         alert('No se pudo descargar el archivo');
         
         return;
       });
     }, (error: any) => {
       alert('No se pudo generar el archivo');
       
       return;
     });*/

  }

  async descargar_boletin_varios_alturaFija() {
    console.log(new Date().toLocaleString())
    this.spinner = true;
    const doc = new jsPDF('p', 'pt', 'a4');
    var pageWidth = doc.internal.pageSize.getWidth();
    var pageHeight = doc.internal.pageSize.getHeight();
    var img = new Image()
    img.src = 'assets/images2/fondo_boletin.png';
    console.log(img);
    var width_size = 0;
    var height_size = 0;
    for (let index = 0; index < this.data.length; index++) {
      //for (let index = 0; index < 1; index++) {
      var nombre = "rayado" + index;
      console.log(nombre);
      this.avance = index / this.data.length * 100;
      //console.log(nombre);
      var boletin = document.getElementById(`${nombre}`);
      if (index == 0) {

        await html2canvas(boletin, {
        }).then(canvas => {
          //console.log(canvas);
          width_size = 956*1.10;
          height_size = canvas.height;
        });
      }
      var canvas = await this.obtener_canvas(boletin,956*1.10,height_size);
      console.log(canvas);
      const widthRatio = pageWidth / 956*1.10;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? widthRatio : heightRatio;
       
      const canvasWidth = canvas.width * widthRatio;
      const canvasHeight = canvas.height * heightRatio;
      //console.log(data.innerHTML);
     doc.addImage(img, 'png', 0, 0, pageWidth, pageHeight,undefined,'FAST');

     doc.addImage(canvas, 'png', pageWidth * 0.10, pageHeight * 0.13, canvasWidth , canvasHeight * 0.60,undefined,'FAST');
     this.cantidad++;
      if(index + 1 < this.data.length){
        doc.addPage('a4', 'p');
      }
    
  }
  console.log(new Date().toLocaleString())

   // doc.output('dataurlnewwindow');
    this.spinner = false;
    doc.save('Boletines-Estudiante-'+this.codigo_select+'.pdf'); // Generated PDF
    this.cantidad = 0;




    /*html2canvas(data).then(canvas => {
        // Few necessary setting options
       /* var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;
    
        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        const imageProps= pdf.getImageProperties(contentDataURL);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imageProps.height * pdfWidth) / imageProps.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('new-file.pdf'); // Generated PDF
    });*/

    //console.log(JSON.stringify(consolidado));
    /* this.api_reportes.ConsolidadoGradoReporteNotas(consolidado).subscribe((data) => {
       this.api_reportes.DescargarConsolidadoGradoReporteNotas(this.grados.filter((item) => item.grad_id == this.grado_select)[0].grad_nombre,this.seccion_select).subscribe((data2) => {
         
       }, (error: any) => {
         alert('No se pudo descargar el archivo');
         
         return;
       });
     }, (error: any) => {
       alert('No se pudo generar el archivo');
       
       return;
     });*/

  }

  async descargar_boletin_varios_alturaFija_recuperacion() {
    console.log(new Date().toLocaleString())
    this.spinner = true;
    const doc = new jsPDF('l', 'mm', [215.9,165.1]);
    var pageWidth = doc.internal.pageSize.getWidth();
    var pageHeight = doc.internal.pageSize.getHeight();
    var img = new Image()
    img.src = 'assets/images2/fondo_recuperacion.png';
    console.log(img);
    var width_size = 0;
    var height_size = 0;
    for (let index = 0; index < this.data.length; index++) {
      //for (let index = 0; index < 1; index++) {
      var nombre = "rayado" + index;
      console.log(nombre);
      this.avance = index / this.data.length * 100;
      //console.log(nombre);
      var boletin = document.getElementById(`${nombre}`);
      if (index == 0) {

        await html2canvas(boletin, {
        }).then(canvas => {
          //console.log(canvas);
          width_size = 956*1.10;
          height_size = canvas.height;
        });
      }
      var canvas = await this.obtener_canvas(boletin,956*1.10,height_size);
      console.log(canvas);
      const widthRatio = pageWidth / 956*1.10;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? widthRatio : heightRatio;
       
      const canvasWidth = canvas.width * widthRatio;
      const canvasHeight = canvas.height * heightRatio;
      //console.log(data.innerHTML);
     doc.addImage(img, 'png', 0, 0, pageWidth, pageHeight,undefined,'FAST');

     doc.addImage(canvas, 'png', pageWidth * 0.10, pageHeight * 0.15, canvasWidth , canvasHeight * 0.8,undefined,'FAST');
    
  }
  console.log(new Date().toLocaleString())

   // doc.output('dataurlnewwindow');
    this.spinner = false;
    doc.save('Boletines-Estudiante-'+this.codigo_select+'.pdf'); // Generated PDF
    this.cantidad = 0;
  }


  async descargar_boletin_varios_sinimagen_alturaFija_Clave(val) {
    console.log(new Date().toLocaleString())
    this.spinner = true;
    const doc = new jsPDF('p', 'pt', 'a4');
    var pageWidth = doc.internal.pageSize.getWidth();
    var pageHeight = doc.internal.pageSize.getHeight();
    var img = new Image()
    img.src = 'assets/images2/fondo_boletin.png';
    var width_size = 0;
    var height_size = 0;
    var index = this.data.findIndex(x => x.clave == val);

    if(index != -1){
      var nombre = "rayado" + index;
      console.log(index);
      this.avance = index / this.data.length * 100;
      //console.log(nombre);
      var boletin = document.getElementById(`${nombre}`);

        await html2canvas(boletin, {
        }).then(canvas => {
          //console.log(canvas);
          width_size = 956*1.10;
          height_size = canvas.height;
        });
      
      var canvas = await this.obtener_canvas(boletin,956*1.10,height_size);
      console.log(canvas);
      const widthRatio = pageWidth / 956*1.10;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? widthRatio : heightRatio;
       
      const canvasWidth = canvas.width * widthRatio;
      const canvasHeight = canvas.height * heightRatio;
      //console.log(data.innerHTML);
     // doc.addImage(img, 'png', 0, 0, pageWidth, pageHeight,undefined,'FAST');

     doc.addImage(canvas, 'png', pageWidth * 0.10, pageHeight * 0.13, canvasWidth , canvasHeight * 0.60,undefined,'FAST');
    
  
  console.log(new Date().toLocaleString())

   // doc.output('dataurlnewwindow');
    this.spinner = false;
    doc.save('Boletines-Estudiante-'+this.codigo_select + 'Clave' + val+'.pdf'); // Generated PDF
    this.cantidad = 0;
    this.clave_seleccionada = 0;

      }else{
        this.spinner = false;
        alert('No se encontro la clave ingresada');
        return;
      }
  }

  async descargar_boletin_varios_alturaFija_Clave(val) {
    console.log(new Date().toLocaleString())
    this.spinner = true;
    const doc = new jsPDF('p', 'pt', 'a4');
    var pageWidth = doc.internal.pageSize.getWidth();
    var pageHeight = doc.internal.pageSize.getHeight();
    var img = new Image()
    img.src = 'assets/images2/fondo_boletin.png';
    var width_size = 0;
    var height_size = 0;
    var index = this.data.findIndex(x => x.clave == val);

    if(index != -1){
      var nombre = "rayado" + index;
      console.log(index);
      this.avance = index / this.data.length * 100;
      //console.log(nombre);
      var boletin = document.getElementById(`${nombre}`);

        await html2canvas(boletin, {
        }).then(canvas => {
          //console.log(canvas);
          width_size = 956*1.10;
          height_size = canvas.height;
        });
      
      var canvas = await this.obtener_canvas(boletin,956*1.10,height_size);
      console.log(canvas);
      const widthRatio = pageWidth / 956*1.10;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? widthRatio : heightRatio;
       
      const canvasWidth = canvas.width * widthRatio;
      const canvasHeight = canvas.height * heightRatio;
      //console.log(data.innerHTML);
     doc.addImage(img, 'png', 0, 0, pageWidth, pageHeight,undefined,'FAST');

     doc.addImage(canvas, 'png', pageWidth * 0.10, pageHeight * 0.13, canvasWidth , canvasHeight * 0.60,undefined,'FAST');

    
  
  console.log(new Date().toLocaleString())

   // doc.output('dataurlnewwindow');
    this.spinner = false;
    doc.save('Boletines-Estudiante-'+this.codigo_select + 'Clave' + val+'.pdf'); // Generated PDF
    this.cantidad = 0;
    this.clave_seleccionada = 0;
  }else{
    this.spinner = false;
    alert('No se encontro la clave ingresada');
    return;
  }

  }


  async obtener_canvas(boletin,width_size,height_size) {
    var canvas = new Image();

    await htmlToImage.toPng(boletin,{width:1400,quality:0}).then(dataUrl => {
      canvas.src = dataUrl;
      canvas.width = width_size;
      canvas.height = height_size;
    });
    return canvas;
  }

  reprobado_aprobado_recuperacion(nota){

    if(nota>=60){
      return "APROBADO"
    }else{
      return "REPROBADO"
    }

  }

  reprobado_aprobado(nota){

    if(this.ultima_unidad_habilitada){

      if(this.suma_nota_final(nota.unidad1_acumulativo,nota.unidad2_acumulativo,nota.unidad3_acumulativo,nota.unidad4_acumulativo) == 20 && nota.materia == 'PRÁCTICA SUPERVISADA'){

        return "";

      }else if(((this.suma_nota_final(0,0,nota.unidad3,0) < 60 && this.unidades3) || (this.suma_nota_final(0,0,0,nota.unidad4) < 60 && this.unidades4) ) && (nota.materia == 'PRÁCTICA SUPERVISADA' || nota.materia == 'SEMINARIO' || nota.materia == 'TEMARIO')){
        return "REPROBADO";
      }else if(((this.suma_nota_final(0,0,nota.unidad3,0) >= 60 && this.unidades3) || (this.suma_nota_final(0,0,0,nota.unidad4) >= 60 && this.unidades4) ) && (nota.materia == 'PRÁCTICA SUPERVISADA' || nota.materia == 'SEMINARIO' || nota.materia == 'TEMARIO')){
        return "APROBADO";
      }else if(this.suma_nota_final(nota.unidad1_acumulativo,nota.unidad2_acumulativo,nota.unidad3_acumulativo,nota.unidad4_acumulativo) < 60){
        return "REPROBADO";
      } else {
        return "APROBADO";
      }
    }
    else{

    switch (this.unidad_select) {

      case 'UNIDAD 1':
        return this.texto_reprobado_aprobado(nota.unidad1);
        break;

      case 'UNIDAD 2':
        return this.texto_reprobado_aprobado(nota.unidad2);
        break;

      case 'UNIDAD 3':
        return this.texto_reprobado_aprobado(nota.unidad3);
        break;

      case 'UNIDAD 4':
        return this.texto_reprobado_aprobado(nota.unidad4);
        break;


    }

  }

  }



  texto_reprobado_aprobado(nota){

    if(nota < 60){
      return "DEBE MEJORAR";
    } else if(nota >= 60 && nota <= 79){
      return "PUEDE MEJORAR";
    } else if(nota >= 80 && nota <= 90){
      return "SATISFACTORIO";
    } else if(nota >= 91 && nota <= 100){
      return "SOBRESALIENTE";
    } 
  }

  funcion_mensaje_ultima_unidad(notas){
    var cantidad_perdidas = 0;

    for (let index = 0; index < notas.length; index++) {
      const element = notas[index];
      if(element.porcentaje=='1' && element.oficial=='1'){

        if(element.materia == 'PRÁCTICA SUPERVISADA' && this.suma_nota_final(element.unidad1_acumulativo,element.unidad2_acumulativo,element.unidad3_acumulativo,element.unidad4_acumulativo) == 20){
          
        }else{
          var total = 0;
          if((element.materia == 'PRÁCTICA SUPERVISADA' || element.materia == 'SEMINARIO' || element.materia == 'TEMARIO')){
            if(this.unidades3){
            total = this.suma_nota_final(0,0,element.unidad3,0);
            }

            if(this.unidades4){
              total = this.suma_nota_final(0,0,0,element.unidad4);
            }

          }else{
             total = this.suma_nota_final(element.unidad1_acumulativo,element.unidad2_acumulativo,element.unidad3_acumulativo,element.unidad4_acumulativo);
          }

      if(total < 60){
        cantidad_perdidas++;
      }
    }
    }
    }
    if(cantidad_perdidas > this.cantidad_maxima_permitida){
      return 'NO TIENE DERECHO A RECUPERACIÓN';
    }else if(cantidad_perdidas == 0){
      return 'FELICIDADES LO LOGRASTE';
    } else {
      return 'SÍ TIENE DERECHO A RECUPERACIÓN';
    }
  }

  funcion_mensaje_ultima_unidad_recuperacion(notas){
    var cantidad_perdidas = 0;

    for (let index = 0; index < notas.length; index++) {
      const element = notas[index];
      if(element.porcentaje=='1'){

      if(element.nota_recuperacion < 60){
        cantidad_perdidas++;
        }
      }
    }
    if(cantidad_perdidas > 0){
      return 'NO TIENE DERECHO A RECUPERACIÓN';
    }else{
      return 'FELICIDADES LO LOGRASTE';
    }
  }

  validar_nota(nota,materia){
    if(nota == 20 && materia == 'PRÁCTICA SUPERVISADA'){

      return '';

    } else {
      return nota;
    }
  }


  calc_promedio_final(notas){
    var suma = 0;
    var cantidad_materias = 0;
    for (let index = 0; index < notas.length; index++) {
      const element = notas[index];
      if(element.porcentaje=='1' && element.materia=='PRÁCTICA SUPERVISADA' && this.suma_nota_final(element.unidad1_acumulativo,element.unidad2_acumulativo,element.unidad3_acumulativo,element.unidad4_acumulativo)==20){
        //cantidad_materias++;
      } else if(element.porcentaje=='1' ){
        if((element.materia=='SEMINARIO' || element.materia=='PRÁCTICA SUPERVISADA' || element.materia == 'TEMARIO')){
          cantidad_materias++;
          if(this.unidades4){
            suma = suma + parseInt(this.suma_nota_final(0,0,0,element.unidad4));
          }
          if(this.unidades3){
            suma = suma + parseInt(this.suma_nota_final(0,0,element.unidad3,0));
          }
        }else{
        cantidad_materias++;
        suma = suma + parseInt(this.suma_nota_final(element.unidad1_acumulativo,element.unidad2_acumulativo,element.unidad3_acumulativo,element.unidad4_acumulativo));
      }
      }
    }

    return (suma / cantidad_materias).toFixed();

  }

}
