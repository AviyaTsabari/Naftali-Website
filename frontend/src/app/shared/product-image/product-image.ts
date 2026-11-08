import { Component, input } from '@angular/core';

const DEFAULT_IMAGE = '/images/no-image.webp';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.html',
  styleUrl: './product-image.css',
})
export class ProductImage {
  readonly src = input<string | null>(null);
  readonly alt = input('');

  displaySrc(): string {
    const value = this.src();
    return value ? value : DEFAULT_IMAGE;
  }
}
