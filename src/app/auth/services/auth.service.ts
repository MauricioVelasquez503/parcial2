import { Injectable,NgZone } from '@angular/core';
import{first} from 'rxjs/operators'
import Swal from 'sweetalert2';
import{auth} from 'firebase/app';

//import{User} from 'firebase';
import{AngularFireAuth} from '@angular/fire/auth';
import { ReturnStatement } from '@angular/compiler';

import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { User } from "../../models/user";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  public user:User;

  userData: any; // Guardar datos de usuario registrados

  constructor(public afs: AngularFirestore,   //  Inyectar Servicio Firestore
    public afAuth: AngularFireAuth, // Inyectar el servicio de autenticación de Firebase
    public router: Router,  
    public ngZone: NgZone  ) // Servicio NgZone para eliminar la advertencia de alcance externo
     {

      /* Guardar datos de usuario en almacenamiento local cuando
    iniciado sesión y configurando nulo al cerrar sesión*/
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
   }

     // Iniciar sesión con correo electrónico / contraseña
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['home/venta']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
       // window.alert("Por favor revisar credenciales")
       //  window.alert(error.message);
       Swal.fire({
        icon: 'error',
        title: 'Oops...😥',
        text: 'Por favor Revisar Credenciales ',
      })   
      })
  }

    // Regístrese con correo electrónico / contraseña
    SignUp(email, password) {
      return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.router.navigate(['home/venta']);
          /* Llame a la función SendVerificaitonMail () cuando un nuevo usuario firme
          y vuelve la funcion*/
        //  this.SendVerificationMail();
          this.SetUserData(result.user);
        }).catch((error) => {
          window.alert(error.message)
        })
    }

     // Enviar verificación por correo electrónico cuando se registre un nuevo usuario
  /*SendVerificationMail() {
    return this.afAuth.auth.currentUser.then(u => u.sendEmailVerification())
    .then(() => {
    this.router.navigate(['verify-email-address']);
    })
    }*/

     // Restablecer contraseña olvidada
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Devuelve verdadero cuando el usuario está conectado y 
  // el correo electrónico está verificado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }


  // Lógica de autenticación para ejecutar cualquier proveedor de autenticación  
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
         
          this.router.navigate(['venta']);
        })
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }



  
    /* Configurar datos de usuario al iniciar sesión con nombre de usuario / contraseña,
  registrarse con nombre de usuario / contraseña e iniciar sesión con autenticación social
  proveedor en la base de datos de Firestore usando el servicio AngularFirestore + AngularFirestoreDocument*/
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

    // desconectar
    SignOut() {
      return this.afAuth.auth.signOut().then(() => {
        localStorage.setItem('user', null);
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      })
    }



}
  
/*
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
*/


