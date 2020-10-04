import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { VentaService } from 'src/app/services/venta.service';
import { ActivatedRoute } from '@angular/router';
import { VentaModel } from 'src/app/models/venta.model';
import { ProductoService } from 'src/app/services/producto.service';
import { ProductoModel } from 'src/app/models/producto.model';





@Component({
  selector: 'app-ventaform',
  templateUrl: './ventaform.component.html',
  styleUrls: ['./ventaform.component.css']
})

export class VentaformComponent implements OnInit {


  venta:VentaModel = new VentaModel();

  ventas:VentaModel[]=[];
  cargando=false;
  cargando2=false;
  productos:ProductoModel[]=[];

  


  //-----
  producto:any;

  id='';

  constructor(private _ventS:VentaService,private _prodS:ProductoService,private route: ActivatedRoute) {
    
    
   }

   
   /*copiarvalues()
   {
     var valor1 ;
     valor1 = document.getElementById('labelnombre').value;
     
     document.getElementById('pruebalabel').innerHTML=valor1;
     
   }*/

 

  ngOnInit() {

   
  

    /*if(this.id!== '')
    {
      this._prodS.getProducto(id)
      .subscribe( (resp:any) =>
        {
            this.producto=resp;
        } )
    }*/

    this.cargando = true;
    this.cargando2 = true;
    this._ventS.getVentas()
      .subscribe( resp => {
        this.ventas = resp;
        this.cargando = false;

        console.log(this.ventas);
        
      });

      this._prodS.getProductos()
      .subscribe(resp=>{
        this.productos = resp;
        this.cargando2 = false;

        console.log(this.productos);

      })
  }

  imprimitFactura(numero:number)
  {
    let codigo: String = this.ventas[numero].codprod;
    let desc: String = this.ventas[numero]. descProd;
    let dui: String = this.ventas[numero].duiCli;
    let nombre: String = this.ventas[numero].nameCli;
    let precio: String = this.ventas[numero].precioProd.toString();
    /*this.productos[numero]={codpro,descprod,duicli};*/

    console.log(this.ventas[0]);
    const doc = new jsPDF();
    doc.fromHTML('========================FACTURA COMERICAL========================',10,10);
    doc.fromHTML('codigo:' + codigo,10,20);
    doc.fromHTML('Descripcion de producto:' + desc,10,30);
    doc.fromHTML('Dui de comprador:' + dui,10,40);
    doc.fromHTML('Nombre del Comprador:' + nombre,10,50);
    doc.fromHTML('Precio a pagar: $' + precio,10,60);
    doc.fromHTML('=================================================================',10,80);
    

    doc.save('factura');
    
  }
  


  guardar(forma: NgForm){

    console.log(forma);
    if(forma.invalid){
      return;
    }

      
    

   

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if(forma.valid){
      this.id = forma.value.id;
      peticion = this._ventS.nuevaVenta( forma.value );
    }
    

    
    peticion.subscribe( resp => {

      Swal.fire({
        title:'seeeeeeeee',
        text: 'Se actualizó correctamente',
        icon: 'success'
      });

      console.log('guardado'+ resp);
      

    });

  }




}
