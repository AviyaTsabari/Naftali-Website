import { Component, input, output } from '@angular/core';
import { Product } from '../../models/product';
import { ProductImage } from '../product-image/product-image';

@Component({
  selector: 'app-product-card',
  imports: [ProductImage],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  readonly product = input.required<Product>();
  readonly inCart = input(false);
  readonly add = output<void>();
}
