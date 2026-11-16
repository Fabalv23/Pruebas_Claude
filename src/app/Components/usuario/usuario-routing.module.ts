import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/Components/usuario/layout.component';
import { UsuarioComponent } from 'src/app/Components/usuario/usuario.component';
import { CambioContraseniaComponent } from '../cambio-contrasenia/cambio-contrasenia.component';
import { ControlAcademicoMenuComponent } from './control-academico-menu/control-academico-menu.component';
import { ConvivenciaMenuComponent } from './convivencia-menu/convivencia-menu.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { PastoralMenuComponent } from './pastoral-menu/pastoral-menu.component';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [                        
            { path: 'Home', component: UsuarioComponent },  
            { path: 'Inscripcion', component: InscripcionComponent },  
            { path: 'Pastoral', component: PastoralMenuComponent },  
            { path: 'Convivencia', component: ConvivenciaMenuComponent },  
            { path: 'ControlAcademico', component: ControlAcademicoMenuComponent },  

            { path: 'CambioPassword', component: CambioContraseniaComponent }         
                           
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
