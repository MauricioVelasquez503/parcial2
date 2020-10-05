import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModel } from '../models/producto.model';
import { delay, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private api = 'https://desafio2-d.firebaseio.com';

  constructor(private http: HttpClient) { }



  nuevoPoducto(producto:ProductoModel){
    return this.http.post(`${this.api}/productos.json`, producto)
    .pipe(
      map((resp:any)=>{
        producto.id = resp.name;
        console.log(producto);
        
        return producto;
        

      })
    )

  }

  borrarProducto( id: string ) {

    return this.http.delete(`${ this.api }/productos/${ id }.json`);

  }

  getProducto( id: string ) {

    return this.http.get(`${ this.api }/productos/${ id }.json`);

  }



  getProductos(){
    return this.http.get(`${ this.api }/productos.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(0)
    );
  }


  


  private crearArreglo( prodObj: object ) {

    const productos:ProductoModel[] = [];

    Object.keys( prodObj ).forEach( key => {

      const prod: ProductoModel = prodObj[key];
      
      prod.id = key;

      productos.push( prod );
    });


    return productos;

  }





}
