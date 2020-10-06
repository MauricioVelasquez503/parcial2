import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaModel } from '../models/venta.model'
import { delay, map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private api = 'https://desafio2-d.firebaseio.com/';


  constructor(private http: HttpClient) { }


  nuevaVenta(venta: VentaModel){
    return this.http.post(`${this.api}/ventas.json`, venta)
    .pipe(
      map((resp:any)=>{
        venta.id = resp.name;
      
        return venta;
        
      })
    )
    
  }

  getVentas(){
    return this.http.get(`${ this.api }/ventas.json`)
    .pipe(
      map( this.crearArreglo ),
      delay(0)
    );
  }

  private crearArreglo( ventaObj: object ) {

    const ventas: VentaModel[] = [];

    Object.keys( ventaObj ).forEach( key => {

      const venta: VentaModel = ventaObj[key];
      venta.id = key;

      ventas.push( venta );
    });


    return ventas;

  }


}
