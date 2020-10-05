import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {

  public isLogged = false;
  public user: any;
  public user$:Observable <any> =  this.authSvc.afAuth.user;

  constructor(public authSvc: AuthService) { }

  async ngOnInit() {
    
   

   /* console.log('Navbar');
    this.user = await this.authSvc.getCurrentUser();
    if(this.user){
      this.isLogged=true;
      
    }*/
    

  }

 /* onLogout()
  {
    this.authSvc.SignOut();
  }
    
*/
}
