import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { VentaService } from 'src/app/services/venta.service';
import { ActivatedRoute } from '@angular/router';
import { VentaModel } from 'src/app/models/venta.model';
import { ProductoService } from 'src/app/services/producto.service';



@Component({
  selector: 'app-ventaform',
  templateUrl: './ventaform.component.html',
  styleUrls: ['./ventaform.component.css']
})

export class VentaformComponent implements OnInit {


  venta:VentaModel = new VentaModel();

  ventas:VentaModel[]=[];
  cargando=false;
  productos:any[]=[];


  constructor(private _ventS:VentaService,private _prodS:ProductoService,private route: ActivatedRoute) {
   const id = this.route.snapshot.paramMap.get('id');

   }

 

  ngOnInit() {

    this.cargando = true;
    this._ventS.getVentas()
      .subscribe( resp => {
        this.ventas = resp;
        this.cargando = false;

        console.log(this.ventas);
        
      });

      this._prodS.getProductos()
      .subscribe(resp=>{
        this.productos = resp;
        this.cargando = false;

        console.log(this.productos);

      })
  }

  guardar(forma: NgForm){

    console.log(forma.value);
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
