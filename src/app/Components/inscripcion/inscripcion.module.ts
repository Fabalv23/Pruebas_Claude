import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionRoutingModule } from './inscripcion-routing';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { PvalidainscritoComponent } from './pvalidainscrito/pvalidainscrito.component';
import { CRUDEstudianteComponent } from './crudestudiante/crudestudiante.component';
import { InscripcionComponent } from './inscripcion.component';
import { EditarEstudianteComponent } from './editar-estudiante/editar-estudiante.component';
import { ReinscripcionComponent } from './reinscripcion/reinscripcion.component';
import { ReInscribirEstudianteComponent } from './re-inscribir-estudiante/re-inscribir-estudiante.component';
import { PreInscripcionComponent } from './pre-inscripcion/pre-inscripcion.component';
import { CPreInscripcionComponent } from './pre-inscripcion/cpre-inscripcion/cpre-inscripcion.component';
import { SubirboletaComponent } from './subirboleta/subirboleta.component';


@NgModule({
  declarations: [PvalidainscritoComponent, CRUDEstudianteComponent,InscripcionComponent, EditarEstudianteComponent, ReinscripcionComponent, ReInscribirEstudianteComponent, PreInscripcionComponent, CPreInscripcionComponent, SubirboletaComponent],
  imports: [
    CommonModule,
    InscripcionRoutingModule,
    ReactiveFormsModule,
    TextMaskModule
  ]
})
export class InscripcionModule { }
