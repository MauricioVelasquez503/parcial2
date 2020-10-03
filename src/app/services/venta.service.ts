import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VentaModel } from '../models/venta.model'
import { map } from 'rxjs/operators';



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
        console.log(venta);
        
        return venta;
        

      })
    )
    
  }
}
