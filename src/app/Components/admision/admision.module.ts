import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import {AdmisionComponent} from 'src/app/Components/admision/admision.component'

import { AdmisionRoutingModule } from './admision-routing';
import { CRUDVerComponent } from './crudver/crudver.component';
import { TextMaskModule } from 'angular2-text-mask';
import { CRUDAlumnoComponent } from './crudalumno/crudalumno.component';




@NgModule({
    imports: [
        CommonModule,        
        AdmisionRoutingModule,
        TextMaskModule,
        ReactiveFormsModule
    ],
    declarations: [        
      AdmisionComponent, CRUDVerComponent, CRUDAlumnoComponent
    ],
    exports:[
        AdmisionRoutingModule
    ],
    bootstrap:[]
    
    
})
export class AdmisionModule { }