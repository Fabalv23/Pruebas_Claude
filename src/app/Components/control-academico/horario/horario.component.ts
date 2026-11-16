import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AcademicoService } from 'src/Services/academico.services';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  ruta_matutina = "";
  ruta_vespertina = "";
  ruta_nocturna = "";
  ruta_examen = "";
  constructor(private apiacademico: AcademicoService, private route: ActivatedRoute,private http: HttpClient) {

    this.apiacademico.ListarHorarioEstudiante(this.route.snapshot.paramMap.get('id')).subscribe(data => {

      if (data && data.length > 0) {

        for (let index = 0; index < data.length; index++) {
          const element = data[index];

          if (element.jornada_matutina != null) {

            this.ruta_matutina = element.jornada_matutina;

          } else if (element.jornada_vespertina != null) {

            this.ruta_vespertina = element.jornada_vespertina;

          } else if (element.jornada_nocturna != null) {

            this.ruta_nocturna = element.jornada_nocturna;

          }else if (element.examen != null) {

            this.ruta_examen = element.examen;

          }


        }
      }



    })
  }

  ngOnInit(): void {
  }
  descargar(url) {
    // window.location.href=url;

    // var extension_file_array = url.toString().split('.');
    var name_array = url.toString().split('/');

    var name = name_array[name_array.length - 1];

    this.http.get('http://34.138.40.177:9090/' + url, { responseType: "blob" })
      .subscribe(blob => {
        console.log(blob);
        saveAs(blob, name);
      });

  }


}
