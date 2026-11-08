import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, SHOP_CATEGORIES } from '../../models/product';
import { Cart } from '../../services/cart';
import { Catalog } from '../../services/catalog';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-shop',
  imports: [RouterLink, ProductCard],
  templateUrl: './shop.html',
  styleUrl: './page.css',
})
export class ShopPage implements OnInit {
  private readonly catalog = inject(Catalog);
  protected readonly cart = inject(Cart);
  protected readonly categories = SHOP_CATEGORIES;
  protected readonly products = signal<Product[]>([]);
  protected readonly error = signal<string | null>(null);
  protected readonly loading = signal(true);

  ngOnInit(): void {
    this.catalog.listProducts().subscribe({
      next: (items) => {
        this.products.set(items);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }
}
