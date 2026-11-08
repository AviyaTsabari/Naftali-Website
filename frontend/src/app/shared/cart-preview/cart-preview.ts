import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cart } from '../../services/cart';

@Component({
  selector: 'app-cart-preview',
  imports: [RouterLink],
  templateUrl: './cart-preview.html',
  styleUrl: './cart-preview.css',
})
export class CartPreview {
  constructor(protected readonly cart: Cart) {}
}
