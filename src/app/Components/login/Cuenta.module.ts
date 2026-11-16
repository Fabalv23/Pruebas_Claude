import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CuentaRoutingModule } from 'src/app/Components/Cuenta-routing.module';
import { LayoutComponent } from 'src/app/Components/login/layout.component';
import {RegistroComponent} from 'src/app/Components/login/registro/registro.component';

import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
    imports: [
        CommonModule,        
        CuentaRoutingModule,
        ReactiveFormsModule,
        TextMaskModule
    ],
    declarations: [
        LayoutComponent,
        RegistroComponent,
              
    ],
    exports:[
        CuentaRoutingModule
    ]    
})
export class CuentaModule { }