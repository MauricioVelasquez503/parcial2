import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import{FormsModule, ReactiveFormsModule} from '@angular/forms'

import{AngularFireModule} from '@angular/fire'
import{AngularFireAuthModule} from '@angular/fire/auth'
import { environment } from 'src/environments/environment';
import { VentaformComponent } from './components/ventaform/ventaform.component';
import { ProductosComponent } from './components/productos/productos.component';

import { AngularFirestoreModule } from '@angular/fire/firestore';




@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    HomeComponent,
    LoginComponent,
    VentaformComponent,
    ProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    HttpClientModule,
    AngularFirestoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
