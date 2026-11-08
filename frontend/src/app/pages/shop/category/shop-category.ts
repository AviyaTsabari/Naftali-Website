import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { categoryLabel, isProductCategory, Product } from '../../../models/product';
import { Cart } from '../../../services/cart';
import { Catalog } from '../../../services/catalog';
import { ProductCard } from '../../../shared/product-card/product-card';

@Component({
  selector: 'app-shop-category',
  imports: [RouterLink, ProductCard],
  templateUrl: './shop-category.html',
  styleUrl: '../page.css',
})
export class ShopCategoryPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly catalog = inject(Catalog);
  protected readonly cart = inject(Cart);

  protected readonly title = signal('חנות');
  protected readonly products = signal<Product[]>([]);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    const category = this.route.snapshot.paramMap.get('category') ?? '';
    if (!isProductCategory(category)) {
      this.error.set('הקטגוריה לא נמצאה');
      return;
    }

    this.title.set(categoryLabel(category) ?? 'חנות');
    this.catalog.listProducts(category).subscribe({
      next: (items) => this.products.set(items),
      error: (err: Error) => this.error.set(err.message),
    });
  }
}
