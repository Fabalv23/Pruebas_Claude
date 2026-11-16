import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../usuario/layout.component';
import { AdministrarExcusaComponent } from './administrar-excusa/administrar-excusa.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ExcusaComponent } from './excusa/excusa.component';
import { VAsistenciaComponent } from './v-asistencia/v-asistencia.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [            
        { path: 'Excusas', component: ExcusaComponent },  
        { path: 'AdministrarExcusa/:codigo', component: AdministrarExcusaComponent },
        { path: 'Asistencia', component: AsistenciaComponent },
        { path: 'Asistencia/:codigo', component: VAsistenciaComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConvivenciaRoutingModule { }
