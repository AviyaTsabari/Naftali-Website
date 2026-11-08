import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Cart {
  readonly itemCount = signal(0);
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
}
