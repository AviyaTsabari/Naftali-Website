import { Component } from '@angular/core';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-cart-preview',
  templateUrl: './cart-preview.html',
  styleUrl: './cart-preview.css',
})
export class CartPreview {
  constructor(protected readonly cart: Cart) {}
}
