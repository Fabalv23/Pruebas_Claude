import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PastoralRoutingModule } from './pastoral-routing.module';
import { GruposPastoralesComponent } from './grupos-pastorales/grupos-pastorales.component';
import { GruposSacramentalesComponent } from './grupos-sacramentales/grupos-sacramentales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [GruposPastoralesComponent, GruposSacramentalesComponent],
  imports: [
    CommonModule,
    PastoralRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class PastoralModule { }
