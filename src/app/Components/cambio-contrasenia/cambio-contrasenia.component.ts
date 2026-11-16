import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/Services/api.services';
import { TokenStorageService } from 'src/Services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cambio-contrasenia',
  templateUrl: './cambio-contrasenia.component.html',
  styleUrls: ['./cambio-contrasenia.component.css']
})
export class CambioContraseniaComponent implements OnInit {

  cambio_pass:FormGroup;


  constructor(private fb: FormBuilder,private apiservice:ApiService,private token:TokenStorageService,private router:Router) { }


  enviar(){
    
    var usuid = this.token.getUser().usu_id;

    this.apiservice.ActualizarPassUsuarios(usuid,this.cambio_pass.value).subscribe((data)=>{
      alert(data.message)
      this.router.navigateByUrl('/Usuario/Home')
      return;
    })


  }


  ngOnInit(): void {
    this.cambio_pass = this.fb.group({
      pass:['']
    })


  }

}
