import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubirboletaComponent } from '../inscripcion/subirboleta/subirboleta.component';
import { LayoutComponent } from '../usuario/layout.component';
import { BoletaPagoComponent } from './boleta-pago/boleta-pago.component';
import { DetallecuentaComponent } from './detallecuenta/detallecuenta.component';
import { EstadocuentaActualComponent } from './estadocuenta-actual/estadocuenta-actual.component';
import { EstadocuentaComponent } from './estadocuenta/estadocuenta.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [            
        { path: 'EstadoCuenta', component: EstadocuentaComponent },
        { path: 'DetalleCuenta/:id', component: DetallecuentaComponent },
        { path: 'CuentaCicloActual/:id', component: EstadocuentaActualComponent },
        { path: 'SubirBoletaPago/:id', component: BoletaPagoComponent },

       

      /*  { path: 'registro', component: RegistroComponent },
        { path: 'test', component: TestAPIComponent },*/
        
                       
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancieroRoutingModule { }
