import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {ApiService} from 'src/Services/api.services'

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private subscriber: any;

  constructor(private http: HttpClient,private apiservice: ApiService,private route: ActivatedRoute,private router: Router) { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public RevalidarTiempo(){    
    
    this.subscriber = this.route.params.subscribe(params => {	        
    
      this.apiservice.RefreshToken(this.getUser())
              .subscribe(result => {

                window.sessionStorage.removeItem(TOKEN_KEY);

                window.sessionStorage.setItem(TOKEN_KEY, result.token);
         
              },
              (error: any) => {                 
                  return;
              });   
   });


    
  }



}