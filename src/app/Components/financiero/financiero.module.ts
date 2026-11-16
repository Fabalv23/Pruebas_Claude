import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancieroRoutingModule } from './financiero-routing.module';
import { EstadocuentaComponent } from './estadocuenta/estadocuenta.component';
import { DetallecuentaComponent } from './detallecuenta/detallecuenta.component';
import { EstadocuentaActualComponent } from './estadocuenta-actual/estadocuenta-actual.component';
import { BoletaPagoComponent } from './boleta-pago/boleta-pago.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [EstadocuentaComponent, DetallecuentaComponent, EstadocuentaActualComponent, BoletaPagoComponent],
  imports: [
    CommonModule,
    FinancieroRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FinancieroModule { }
