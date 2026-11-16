import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistroComponent} from 'src/app/Components/login/registro/registro.component'
import {LoginComponent} from 'src/app/Components/login/login.component'
import { LayoutComponent } from 'src/app/Components/login/layout.component';
import { TestAPIComponent } from './test-api/test-api.component';


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [            
            { path: '', component: LoginComponent },
            { path: 'registro', component: RegistroComponent },
            { path: 'test', component: TestAPIComponent },
            
                           
        ]
    }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
