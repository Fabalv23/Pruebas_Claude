import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { ModalComponent } from './Components/Modal/modal/modal.component';
import { ModalService } from 'src/Services/modal.services';
import { ReactiveFormsModule } from '@angular/forms';

import { CuentaRoutingModule } from "./Components/Cuenta-routing.module"; //<------
import { HttpClientModule } from "@angular/common/http";
import { TestAPIComponent } from './Components/test-api/test-api.component';
import { UsuarioRoutingModule } from './Components/usuario/usuario-routing.module';
import { SideBarComponent } from './Components/General/side-bar/side-bar.component';
import { AdmisionComponent } from './Components/admision/admision.component';
import { InscripcionComponent } from './Components/inscripcion/inscripcion.component';
import { AdmisionRoutingModule } from './Components/admision/admision-routing';

import { NgxMaskModule } from 'ngx-mask'
import { TextMaskModule } from 'angular2-text-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModalComponent         
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CuentaRoutingModule,
    HttpClientModule,
    UsuarioRoutingModule,
    AdmisionRoutingModule,
    NgxMaskModule  ,
    TextMaskModule,
    BrowserAnimationsModule  
  ],
  providers: [ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
