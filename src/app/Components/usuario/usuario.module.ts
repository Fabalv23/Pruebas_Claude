import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from 'src/app/Components/usuario/layout.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioComponent } from './usuario.component';
import { SideBarComponent } from '../General/side-bar/side-bar.component';
import { CambioContraseniaComponent } from '../cambio-contrasenia/cambio-contrasenia.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { PastoralMenuComponent } from './pastoral-menu/pastoral-menu.component';
import { ConvivenciaMenuComponent } from './convivencia-menu/convivencia-menu.component';
import { ControlAcademicoMenuComponent } from './control-academico-menu/control-academico-menu.component';


@NgModule({
    imports: [
        CommonModule,        
        UsuarioRoutingModule,
        ReactiveFormsModule        
    ],
    declarations: [
        LayoutComponent,
        UsuarioComponent,
        SideBarComponent,
        CambioContraseniaComponent,
        InscripcionComponent,
        PastoralMenuComponent,
        ConvivenciaMenuComponent,
        ControlAcademicoMenuComponent     
    ],
    exports:[
        UsuarioRoutingModule
    ],
    bootstrap:[LayoutComponent]
    
    
})
export class UsuarioModule { }