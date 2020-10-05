import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  producto:ProductoModel= new ProductoModel();
  cargando=false;
  productos:ProductoModel[]=[];

  constructor(private _prodS:ProductoService,  private route: ActivatedRoute,
    private router: Router,  ) { }

  ngOnInit() {
    this.cargando = true;
    this.getProductos();
  }

  getProductos() {
    this._prodS.getProductos()
    .subscribe(resp=>{
      this.productos = resp;
      this.cargando=false;

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
      peticion = this._prodS.nuevoPoducto( forma.value );
    }
    

    
    peticion.subscribe( resp => {

      Swal.fire({
        title:'Exito 👌🏻 ',
        text: 'Se ingreso correctamente',
        icon: 'success'
      });
      //this.router.navigate('producto');
      //this.router.navigateByUrl('producto');

      console.log('guardado'+ resp);
      

    });

  }

  eliminar(id:string){

    Swal.fire({
      title: 'Eliminar registro? 🙊 ',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        
        this._prodS.borrarProducto(id).subscribe( resp => {

     
          Swal.fire(
            'Eliminado!',
            'Su registro se eliminó con éxito.',
            'success'
          )
          this.getProductos();
        }, error => {
          //SweetAlert
        });
      }
    })

    
  }


}
