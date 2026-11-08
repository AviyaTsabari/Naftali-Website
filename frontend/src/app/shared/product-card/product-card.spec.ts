import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Product } from '../../models/product';
import { ProductCard } from './product-card';

const sample: Product = {
  id: 'prod-tamar',
  name: 'דגם תמר',
  category: 'mezuzahs',
  price: 100,
  currency: null,
  image: null,
  description: '',
  available: true,
};

@Component({
  imports: [ProductCard],
  template: `<app-product-card [product]="product" [inCart]="inCart" (add)="added = true" />`,
})
class Host {
  product = sample;
  inCart = false;
  added = false;
}

describe('ProductCard', () => {
  it('renders a placeholder image, mock price, and add button', () => {
    TestBed.configureTestingModule({
      imports: [Host],
    });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('דגם תמר');
    expect(text).toContain('מחיר לדוגמה');
    expect(text).toContain('הוספה לעגלה');
    expect(fixture.nativeElement.querySelector('img')?.getAttribute('src')).toBe(
      '/images/no-image.webp',
    );

    fixture.nativeElement.querySelector('.add').click();
    expect(fixture.componentInstance.added).toBeTrue();
  });
});
