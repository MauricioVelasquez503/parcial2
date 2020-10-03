import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { VentaService } from 'src/app/services/venta.service';
import { ActivatedRoute } from '@angular/router';
import { VentaModel } from 'src/app/models/venta.model';



@Component({
  selector: 'app-ventaform',
  templateUrl: './ventaform.component.html',
  styleUrls: ['./ventaform.component.css']
})

export class VentaformComponent implements OnInit {


  venta:VentaModel = new VentaModel();


  constructor(private _ventS:VentaService,private route: ActivatedRoute) {
   const id = this.route.snapshot.paramMap.get('id');

   }

 

  ngOnInit() {
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
