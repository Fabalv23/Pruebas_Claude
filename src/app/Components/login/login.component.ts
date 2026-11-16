import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/Services/modal.services'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from 'src/Services/api.services'
import { usuario } from 'src/models/usuarios';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/Services/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  d = new Date();
  fecha:any;
  private bodyText: string;
  recuperaform: FormGroup;
  loading = false;


  LoginForm: FormGroup;

  private subscriber: any;
  
	user: usuario = new usuario(
    {id_usuario: "2", 
		nombre: "JUAN"});
  private  user1 : usuario[];

  isLoggedIn = false;
  isLoginFailed = false;

  public mask_cod = [/\d/,/\d/,'-',/([A-ZÁÉÍÓÚÑ]|[a-záéíóú\'])/,'-',/\d/,/\d/,/\d/,/\d/];
  constructor(private modalService: ModalService, private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,private http: HttpClient,private apiservice: ApiService,private route: ActivatedRoute,private router: Router) {             
  }

  
  nombre:string;
  
  ngOnInit() {

  
    this.tokenStorage.signOut();

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;      
    }


    if(this.isLoggedIn){
      this.router.navigateByUrl('Usuario/Home');
    }


   
      this.fecha = Date.now();

      this.bodyText = 'This text can be updated in modal 1';
      this.recuperaform = this.formBuilder.group({
        username: ['', [Validators.required,Validators.pattern(/[\d/][\d/][-]([A-ZÁÉÍÓÚÑ]|[a-záéíóú\'])[-][/\d/][/\d/][/\d/][/\d/]$/)]],
        password: ['', Validators.required]
    });

    this.LoginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  openModal(id: string) {
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  get f() { return this.recuperaform.controls; }

  onSubmit(id:string) {



    this.apiservice.RecuperarCorreo(this.f.username.value).subscribe((data)=>{

      
        this.apiservice.RecuperarPassword(data).subscribe((res) => {

          alert('Envio exitoso al correo '+ data.email )
          this.closeModal(id);

        })



    },
    (error: any) => {
        alert('Estudiante no encontrado');
        return;
    });
    
    
    return;
   
    
   
}


get credenciales() { return this.LoginForm.controls; }

LOGIN(){

  

  

  this.subscriber = this.route.params.subscribe(params => {	        
    
    this.apiservice.login(this.credenciales.email.value,this.credenciales.password.value)
            .subscribe(result => {
              this.tokenStorage.saveToken(result.token);
              this.tokenStorage.saveUser(result.autorizado);    
              this.router.navigateByUrl('Usuario/Home');
            },
            (error: any) => {
                alert('USUARIO O CONTRASEÑA INCORRECTA');
                return;
            });   
 });

}




}

