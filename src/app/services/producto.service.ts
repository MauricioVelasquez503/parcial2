import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaModel } from '../models/venta.model'
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private api = 'https://desafio2-d.firebaseio.com';

  constructor(private http: HttpClient) { }

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

    const productos:any[] = [];

    Object.keys( prodObj ).forEach( key => {

      const prod: any = prodObj[key];
      prod.id = key;

      productos.push( prod );
    });


    return productos;

  }
}
