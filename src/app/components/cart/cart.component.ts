import {Component, inject} from '@angular/core';
import {Cosmetico} from "../../common/interfaceApi";
import {CartService} from "../../services/cart.service";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  private readonly cartService:CartService = inject(CartService);
  cosmeticList!:Cosmetico[];
  precioTotal!:number;

  constructor() {
    this.loadCosmetic();
    this.loadtotal();
  }

  private loadCosmetic() {
    this.cartService.carrito.subscribe(
      {
        next: value => this.cosmeticList = value,
        error: err => console.log(err),
        complete: () => console.log("Completed"),
      }
    )
  }

  private loadtotal() {
    this.cartService.precioCarrito.subscribe(
      {
        next: value => {this.precioTotal = value; },
        complete: () => {console.log("Completed")},
        error: err => console.log(err),
      }
    )
  }
}
