import { Injectable } from '@angular/core';
import * as jwt_decode from "jwt-decode";
import { TokenStorageService } from 'src/Services/token-storage.service';
import { Router } from '@angular/router';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private tokenStorage: TokenStorageService,private router: Router) { }

//validar otra vez la sesion

RevalSesion():void{
    if (this.validarInicioSesion()) {
          
        this.tokenStorage.RevalidarTiempo();
        
      }else{
        alert('Tiempo de Sesión Expirado ');
        
        this.tokenStorage.signOut();
        this.router.navigateByUrl('login');
        return;
      }
  
}




//metodo para validar la sesion del usuario
validarInicioSesion():boolean{

    const   decoded = jwt_decode(this.tokenStorage.getToken());
    if(decoded.exp === undefined) 
    {
        return false;
    }

    
    const date = new Date(0);

     
    let tokenExpDate = date.setUTCSeconds(decoded.exp);

    

    if(tokenExpDate.valueOf() > new Date().valueOf()) 
    {
        return true;
    }

}
}