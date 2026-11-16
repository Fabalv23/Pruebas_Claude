import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { Router } from '@angular/router';

@Component({ 
    selector: 'app-layout',    
    templateUrl: './layout.component.html' })
export class LayoutComponent implements OnInit {

    constructor(private tokenstorage:TokenStorageService,private router:Router) { }
  
    NombreCompleto;
    ngOnInit(): void {
            

            this.NombreCompleto =    this.tokenstorage.getUser().usu_nombre + ' '+ this.tokenstorage.getUser().usu_apellido;

    }

    CerrarSesion(){
        this.tokenstorage.signOut();
        this.router.navigateByUrl('login');

    }

}