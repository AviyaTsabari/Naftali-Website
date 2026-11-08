import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

const STORAGE_KEY = 'naftali-cart';

@Injectable({ providedIn: 'root' })
export class Cart {
  private readonly items = signal<CartItem[]>(this.readStorage());
  readonly list = this.items.asReadonly();
  readonly itemCount = computed(() => this.items().length);
  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price, 0),
  );
  readonly isOpen = signal(false);

  open(): void {
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  toggle(): void {
    this.isOpen.update((open) => !open);
  }

  has(productId: string): boolean {
    return this.items().some((item) => item.productId === productId);
  }

  add(product: Product): boolean {
    if (!product.available || this.has(product.id)) {
      return false;
    }

    this.items.update((items) => [
      ...items,
      {
        productId: product.id,
        productName: product.name,
        price: product.price,
      },
    ]);
    this.persist();
    this.isOpen.set(true);
    return true;
  }

  remove(productId: string): void {
    this.items.update((items) => items.filter((item) => item.productId !== productId));
    this.persist();
  }

  setQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.remove(productId);
    }
  }

  private readStorage(): CartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return [];
      }
      const parsed = JSON.parse(raw) as CartItem[];
      if (!Array.isArray(parsed)) {
        return [];
      }
      return parsed.filter(
        (item) =>
          typeof item?.productId === 'string' &&
          typeof item?.productName === 'string' &&
          typeof item?.price === 'number',
      );
    } catch {
      return [];
    }
  }

  private persist(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items()));
  }
}
