import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../cart.service';
import { Router } from '@angular/router';

interface Product {
  name: string;
  image: string;
  weight: string;
  price: number;
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private http: HttpClient,
    public cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.http.get<Product[]>('assets/products.json').subscribe(data => {
      this.products = data;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  updateQuantity(product: Product, quantity: number): void {
    const currentQuantity = this.cartService.getProductQuantity(product);
    const newQuantity = currentQuantity + quantity;

    if (newQuantity <= 0) {
      this.cartService.removeFromCart(product);
    } else {
      this.cartService.updateQuantity(product, newQuantity);
    }
  }
}
