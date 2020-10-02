import { Injectable } from '@angular/core';
import{first} from 'rxjs/operators'

import{auth} from 'firebase/app';

import{User} from 'firebase';
import{AngularFireAuth} from '@angular/fire/auth';
import { ReturnStatement } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user:User;

  constructor(public afAuth:AngularFireAuth) { }

  async loginGoogle()
  {
    try{
      return this.afAuth.auth.signInWithRedirect(new auth.GoogleAuthProvider());

    }
    catch(error)
    {console.log(error)}
  }

 async login(email:string,password:string)
  {
    try{const result = await this.afAuth.auth.signInWithEmailAndPassword(email,password);
      return result;}
    catch(error){console.log(error)}
  
  }

  async register(email:string, password:string){

    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(email,password);
      return result;
    }
    catch(error){}
  }

  async logout(){
    try{await this.afAuth.auth.signOut();}
    catch(error){
      console.log(console.error());
    }
    


  }


  getCurrentUser(){
    console.log('prueba',this.afAuth.authState.pipe(first()).toPromise());
  return this.afAuth.authState.pipe(first()).toPromise();
  
  }

  

  estaAutenticado():boolean
  {
    let correo:any = this.getCurrentUser();

    if(correo !== '')
    {
      return false;
    }

    else
    {
      return true;
    }
  }

}
