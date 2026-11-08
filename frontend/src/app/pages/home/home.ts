import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Poem } from '../../models/poem';
import { Product } from '../../models/product';
import { Cart } from '../../services/cart';
import { Catalog } from '../../services/catalog';
import { PoemCard } from '../../shared/poem-card/poem-card';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCard, PoemCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomePage implements OnInit {
  private readonly catalog = inject(Catalog);
  protected readonly cart = inject(Cart);

  protected readonly products = signal<Product[]>([]);
  protected readonly poems = signal<Poem[]>([]);
  protected readonly error = signal<string | null>(null);
  protected readonly loading = signal(true);
  private pending = 2;

  ngOnInit(): void {
    this.catalog.listProducts().subscribe({
      next: (items) => {
        this.products.set(items.slice(0, 2));
        this.finishLoad();
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.finishLoad();
      },
    });
    this.catalog.listPoems().subscribe({
      next: (items) => {
        this.poems.set(items.slice(0, 1));
        this.finishLoad();
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.finishLoad();
      },
    });
  }

  private finishLoad(): void {
    this.pending -= 1;
    if (this.pending <= 0) {
      this.loading.set(false);
    }
  }
}
