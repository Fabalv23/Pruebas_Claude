import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/Components/usuario/layout.component';
import { UsuarioComponent } from 'src/app/Components/usuario/usuario.component';
import { PvalidainscritoComponent } from './pvalidainscrito/pvalidainscrito.component';
import { CRUDEstudianteComponent } from './crudestudiante/crudestudiante.component';
import { InscripcionComponent } from './inscripcion.component';
import { EditarEstudianteComponent } from './editar-estudiante/editar-estudiante.component';
import { ReinscripcionComponent } from './reinscripcion/reinscripcion.component';
import { ReInscribirEstudianteComponent } from './re-inscribir-estudiante/re-inscribir-estudiante.component';
import { PreInscripcionComponent } from './pre-inscripcion/pre-inscripcion.component';
import { CPreInscripcionComponent } from './pre-inscripcion/cpre-inscripcion/cpre-inscripcion.component';
import { SubirboletaComponent } from './subirboleta/subirboleta.component';



const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [                        
            { path: 'ValidarAdmision', component: PvalidainscritoComponent },
            { path: 'InscripcionNuevo/:id', component: CRUDEstudianteComponent },
            { path: 'Index', component: InscripcionComponent }, 
            { path: 'EditarEstudiante/:id', component: EditarEstudianteComponent },    
            { path: 'ReInscripcion', component: ReinscripcionComponent },
            { path: 'ReInscribirEstudiante/:id', component: ReInscribirEstudianteComponent },   
            { path: 'PreInscripcion', component: PreInscripcionComponent },       
            { path: 'PreInscripcion/:id', component: CPreInscripcionComponent },   
            { path: 'SubirBoleta/:id', component: SubirboletaComponent },       
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionRoutingModule { }
