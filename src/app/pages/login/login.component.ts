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
 

  constructor(public authSvc: AuthService, private router:Router) { }

  ngOnInit() {
  }

}
