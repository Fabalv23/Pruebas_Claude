import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/Services/modal.services'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from 'src/Services/api.services'
import { usuario } from 'src/models/usuarios';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test-api',
  templateUrl: './test-api.component.html',
  styleUrls: ['./test-api.component.css']
})
export class TestAPIComponent implements OnInit {

	private subscriber: any;

  usuarios: usuario[];

  constructor(private http: HttpClient,private apiservice: ApiService,private route: ActivatedRoute) { 
   

  }

  ngOnInit(): void {
    this.subscriber = this.route.params.subscribe(params => {	             
      this.apiservice.getFrase().subscribe((data:usuario[]) => {                                
        
       this.usuarios = data;
        
        

       });     
   });

  }

}
