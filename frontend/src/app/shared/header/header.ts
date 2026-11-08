import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Cart } from '../../services/cart';
import { CartPreview } from '../cart-preview/cart-preview';
import { LoginPreview } from '../login-preview/login-preview';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CartPreview, LoginPreview],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected readonly loginOpen = signal(false);

  constructor(protected readonly cart: Cart) {}

  openLogin(): void {
    this.loginOpen.set(true);
  }

  closeLogin(): void {
    this.loginOpen.set(false);
  }

  cartLabel(): string {
    return `עגלת קניות, ${this.cart.itemCount()} פריטים`;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeLogin();
    this.cart.close();
  }
}
