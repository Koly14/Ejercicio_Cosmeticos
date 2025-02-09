import {Component, inject} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  //mnt 35 sessión 20º
  private readonly cartService: CartService = inject(CartService);
  cantidadCarrito: number = 0;

  constructor() {
    this.cartService.cantidadCarrito.subscribe(
      {
        next: value => {
          this.cantidadCarrito = value;
        },
        complete: () => {
          console.log("Complete")
        },
        error: err => console.log(err.message()),
      }
    )
  }

}
