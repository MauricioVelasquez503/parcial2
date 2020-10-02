import { Component, OnInit } from '@angular/core';
import{FormGroup,FormControl} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService],
})
export class LoginComponent implements OnInit {

 loginForm= new FormGroup({
  
  email: new FormControl(''),
  password: new FormControl('')
 })
 

  constructor(private authSvc: AuthService, private router:Router) { }

  ngOnInit() {
  }

  async onGoogleLogin()
  {
    //al los servicios
  try{
    
    this.authSvc.loginGoogle();
    await this.router.navigate(['/home']);
    
  }
    catch(error){console.log(error)}
    
  }

  async onLogin()
  {
    const{email,password}= this.loginForm.value
    try{

      const user = await this.authSvc.login(email,password);
      if(user)
      {
        //redirecciona al home
        this.router.navigate(['/home']);
      }
    }
    catch(error)
    {
    console.log(console.error());
    }
    this.authSvc.login(email,password);
  }

}
