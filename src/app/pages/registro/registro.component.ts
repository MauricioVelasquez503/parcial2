import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl} from '@angular/forms'
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';
import { Router } from '@angular/router';

import{AuthService} from '../../auth/services/auth.service'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers:[AuthService],
})
export class RegistroComponent implements OnInit {


  registerForm= new FormGroup({
    email: new FormControl(''),
    nombres: new FormControl(''),
    password: new FormControl(''),

  })

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit() { }

 async onRegister()
  {
    const {email,password} = this.registerForm.value
    try{
      const user = await this.authSvc.register(email,password);

      if(user)
      {
        //redirect
        this.router.navigate(['/home']);
      }
    }
    catch(error){console.log(error);
    
   }
  }


}
