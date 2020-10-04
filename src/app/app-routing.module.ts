import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { VentaformComponent } from './components/ventaform/ventaform.component';
import { ProductosComponent } from './components/productos/productos.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    path: 'home' , 
    component: HomeComponent,/*
    canActivateChild:[AuthGuard],*/
    children:[
      {path:'venta', component:VentaformComponent},
      {path:'producto', component:ProductosComponent},
      { path: '**', redirectTo: 'venta' }
    ]
 },
  { path: 'registro', component: RegistroComponent },
  { path: 'login'   , component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
