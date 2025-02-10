import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Cosmetico} from "../common/interfaceApi";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  carrito: BehaviorSubject<Cosmetico[]> = new BehaviorSubject<Cosmetico[]>([]); // Se inicializa vacio el array
  cantidadCarrito:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  precioCarrito:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(cosmetico:Cosmetico){
    var carritoAux = this.carrito.value;
    var precioCarrito = this.precioCarrito.value;

    carritoAux.push(cosmetico);
    this.carrito.next(carritoAux);

    this.cantidadCarrito.next(carritoAux.length);

    precioCarrito+=cosmetico.price;
    this.precioCarrito.next(precioCarrito);
  }

}
