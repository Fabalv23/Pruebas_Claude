import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistroComponent} from 'src/app/Components/login/registro/registro.component'
import {LoginComponent} from 'src/app/Components/login/login.component'
import { FinancieroModule } from './Components/financiero/financiero.module';



const CuentaModule = () => import('./Components/login/Cuenta.module').then(x => x.CuentaModule);
const UsuarioModule = () => import('./Components/usuario/usuario.module').then(x => x.UsuarioModule);
const AdmisionModule = () => import('./Components/admision/admision.module').then(x => x.AdmisionModule);
const InscripcionModule = () => import('./Components/inscripcion/inscripcion.module').then(x => x.InscripcionModule);
const ControlModule = () => import('./Components/control-academico/control-academico.module').then(x => x.ControlAcademicoModule);

const FinancieraModule = () => import('./Components/financiero/financiero.module').then(x => x.FinancieroModule);

const ConvivenciaModule = () => import('./Components/Convivencia/convivencia.module').then(x => x.ConvivenciaModule);
const PastoralModule = () => import('./Components/pastoral/pastoral.module').then(x => x.PastoralModule);


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', loadChildren: CuentaModule},
  { path: 'Usuario', loadChildren: UsuarioModule},
  { path: 'admision', loadChildren: AdmisionModule},
  { path: 'inscripcion', loadChildren: InscripcionModule},
  { path: 'Academia', loadChildren: ControlModule},
  { path: 'Financiera', loadChildren: FinancieraModule},
  { path: 'Convivencia', loadChildren: ConvivenciaModule},
  { path: 'Pastoral', loadChildren: PastoralModule},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
