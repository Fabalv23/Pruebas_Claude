import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlAcademicoRoutingModule } from './control-academico-routing.module';
import { ClasesComponent } from './clases/clases.component';
import { CursosComponent } from './cursos/cursos.component';
import { MaterialComponent } from './material/material.component';
import { DetalleComponent } from './detalle/detalle.component';
import { CuadroComponent } from './cuadro/cuadro.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { HorarioEstudiantesComponent } from './horario-estudiantes/horario-estudiantes.component';
import { HorarioComponent } from './horario/horario.component';
import { BoletinComponent } from './boletin/boletin.component';
import { BoletinDetalleComponent } from './boletin-detalle/boletin-detalle.component';


@NgModule({
  declarations: [ClasesComponent, CursosComponent, MaterialComponent, DetalleComponent, CuadroComponent, ProfesoresComponent, HorarioEstudiantesComponent, HorarioComponent, BoletinComponent, BoletinDetalleComponent],
  imports: [
    CommonModule,
    ControlAcademicoRoutingModule
  ]
})
export class ControlAcademicoModule { }
