import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from 'src/app/Components/usuario/layout.component';
import { UsuarioComponent } from 'src/app/Components/usuario/usuario.component';
import { AdmisionComponent } from './admision.component';
import { CRUDVerComponent } from './crudver/crudver.component';
import { CRUDAlumnoComponent } from './crudalumno/crudalumno.component';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [                        
            { path: 'Index', component: AdmisionComponent },
            { path: 'CRUDVer', component: CRUDVerComponent },     
            { path: 'CRUDAlumno/:id', component: CRUDAlumnoComponent },     
            { path: 'CRUDVer/:id', component: CRUDVerComponent },            
                           
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmisionRoutingModule { }
