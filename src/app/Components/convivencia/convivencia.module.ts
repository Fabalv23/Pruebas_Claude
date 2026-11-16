import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConvivenciaRoutingModule } from './convivencia-routing.module';
import { ExcusaComponent } from './excusa/excusa.component';
import { AdministrarExcusaComponent } from './administrar-excusa/administrar-excusa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Materialodule } from 'src/app/material.module';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { VAsistenciaComponent } from './v-asistencia/v-asistencia.component';



@NgModule({
  declarations: [ExcusaComponent, AdministrarExcusaComponent, AsistenciaComponent, VAsistenciaComponent],
  imports: [
    CommonModule,
    ConvivenciaRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ConvivenciaModule { }
