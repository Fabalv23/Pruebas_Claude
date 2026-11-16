import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../usuario/layout.component';
import { GruposPastoralesComponent } from './grupos-pastorales/grupos-pastorales.component';
import { GruposSacramentalesComponent } from './grupos-sacramentales/grupos-sacramentales.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
        { path: 'gruposPastorales', component: GruposPastoralesComponent },
        { path: 'gruposSacramentales', component: GruposSacramentalesComponent }
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PastoralRoutingModule { }
