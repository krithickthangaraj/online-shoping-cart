import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';


@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
  }

  getTotal(): number {
    return this.cartService.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

}



