import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { API_URL } from '../../../core/api';
import { ShopCategoryPage } from './shop-category';

describe('ShopCategoryPage', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'shop/:category', component: ShopCategoryPage }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  it('renders mock product cards for a category', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/shop/mezuzahs', ShopCategoryPage);

    const http = TestBed.inject(HttpTestingController);
    http.expectOne(`${API_URL}/products?category=mezuzahs`).flush([
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
    harness.detectChanges();

    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('מזוזות');
    expect(root.textContent).toContain('דגם תמר');
    expect(root.textContent).toContain('מחיר לדוגמה');
    expect(root.textContent).toContain('הוספה לעגלה');
    expect(root.querySelector('img')?.getAttribute('src')).toBe('/images/no-image.webp');
    http.verify();
  });

  it('shows an error for an unknown category', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/shop/unknown', ShopCategoryPage);
    harness.detectChanges();

    expect(harness.routeNativeElement?.textContent).toContain('הקטגוריה לא נמצאה');
  });
});
