import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { API_URL } from '../../core/api';
import { Cart } from '../../services/cart';
import { ShopPage } from './shop';

describe('ShopPage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders shop categories and product cards with add-to-cart', () => {
    TestBed.configureTestingModule({
      imports: [ShopPage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    const fixture = TestBed.createComponent(ShopPage);
    fixture.detectChanges();

    const http = TestBed.inject(HttpTestingController);
    http.expectOne(`${API_URL}/products`).flush([
      {
        id: 'prod-tamar',
        name: 'דגם תמר',
        category: 'mezuzahs',
        price: 100,
        currency: null,
        image: null,
        description: 'תיאור יוצג כאן',
        available: true,
      },
    ]);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('חנות');
    expect(text).toContain('מזוזות');
    expect(text).toContain('חנוכיות');
    expect(text).toContain('ריהוט בוטיק');
    expect(text).toContain('דגם תמר');
    expect(text).toContain('הוספה לעגלה');

    const hrefs = [...fixture.nativeElement.querySelectorAll('.categories a')].map(
      (link: HTMLAnchorElement) => link.getAttribute('href'),
    );
    expect(hrefs).toEqual(['/shop/mezuzahs', '/shop/hanukkiahs', '/shop/furniture']);
    http.verify();
  });

  it('adds a product to the cart once', () => {
    TestBed.configureTestingModule({
      imports: [ShopPage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    const fixture = TestBed.createComponent(ShopPage);
    fixture.detectChanges();

    const http = TestBed.inject(HttpTestingController);
    http.expectOne(`${API_URL}/products`).flush([
      {
        id: 'prod-tamar',
        name: 'דגם תמר',
        category: 'mezuzahs',
        price: 100,
        currency: null,
        image: null,
        description: 'תיאור יוצג כאן',
        available: true,
      },
    ]);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.add') as HTMLButtonElement;
    button.click();
    fixture.detectChanges();

    const cart = TestBed.inject(Cart);
    const added = fixture.nativeElement.querySelector('.add') as HTMLButtonElement;
    expect(cart.itemCount()).toBe(1);
    expect(cart.list()[0].productId).toBe('prod-tamar');
    expect(added.disabled).toBeTrue();
    expect(added.textContent).toContain('בעגלה');

    added.click();
    expect(cart.itemCount()).toBe(1);
    http.verify();
  });
});
