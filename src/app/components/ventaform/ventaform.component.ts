import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ventaform',
  templateUrl: './ventaform.component.html',
  styleUrls: ['./ventaform.component.css']
})
export class VentaformComponent implements OnInit {

  constructor() { }

  usuario={
    codprod:'codigo asdsad',
    descProd:'descripcion asdasd',
    precioProd:'precio del producto',
    nameCli:'nombre cliente asdasd',
    duiCli:'dui asdasd',


  }

  ngOnInit() {
  }

  venta(forma: NgForm){

    console.log(forma.value);
    

  }

}
