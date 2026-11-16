import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../usuario/layout.component';
import { ClasesComponent } from './clases/clases.component';
import { CuadroComponent } from './cuadro/cuadro.component';
import { CursosComponent } from './cursos/cursos.component';
import { DetalleComponent } from './detalle/detalle.component';
import { HorarioEstudiantesComponent } from './horario-estudiantes/horario-estudiantes.component';
import { HorarioComponent } from './horario/horario.component';
import { MaterialComponent } from './material/material.component';
import { ProfesoresComponent } from './profesores/profesores.component';
import { BoletinComponent } from './boletin/boletin.component';
import { BoletinDetalleComponent } from './boletin-detalle/boletin-detalle.component';


const routes: Routes = [

  {
    path: '', component: LayoutComponent,
    children: [            
        { path: 'Clases', component: ClasesComponent },

        { path: 'Cursos/:id', component: CursosComponent },

        { path: 'Cursos/:id/Material/:id2', component: MaterialComponent },
        { path: 'Cursos/:id/Material/:id2/:id3', component: DetalleComponent },
        { path: 'Cursos/:id/Material/:id2/Resumen/Cuadro', component: CuadroComponent },

        { path: 'Profesores', component: ProfesoresComponent },
        { path: 'Horarios', component: HorarioEstudiantesComponent },
        { path: 'Horarios/:id', component: HorarioComponent },
        { path: 'Boletin', component: BoletinComponent },
        { path: 'Boletin/:codigo/:grado', component: BoletinDetalleComponent },


      /*  { path: 'registro', component: RegistroComponent },
        { path: 'test', component: TestAPIComponent },*/
        
                       
    ]
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlAcademicoRoutingModule { }
