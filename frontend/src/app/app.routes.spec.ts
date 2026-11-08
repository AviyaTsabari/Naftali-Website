import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { API_URL } from './core/api';
import { routes } from './app.routes';
import { ContactPage } from './pages/contact/contact';
import { HomePage } from './pages/home/home';
import { PoetryPage } from './pages/poetry/poetry';
import { ShopPage } from './pages/shop/shop';
import { ShopCategoryPage } from './pages/shop/category/shop-category';

function flushCatalog(): void {
  const http = TestBed.inject(HttpTestingController);
  const products = http.match(`${API_URL}/products`);
  for (const request of products) {
    request.flush([]);
  }
  const poems = http.match(`${API_URL}/poems`);
  for (const request of poems) {
    request.flush([]);
  }
}

describe('routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), provideHttpClient(), provideHttpClientTesting()],
    });
  });

  it('opens the home page', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/', HomePage);
    flushCatalog();

    expect(page).toBeInstanceOf(HomePage);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('נפתלי');
  });

  it('opens the poetry page', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/poetry', PoetryPage);
    flushCatalog();

    expect(page).toBeInstanceOf(PoetryPage);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('שירה');
  });

  it('opens the shop page', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/shop', ShopPage);

    expect(page).toBeInstanceOf(ShopPage);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('חנות');
  });

  it('opens a shop category page', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/shop/mezuzahs', ShopCategoryPage);
    const http = TestBed.inject(HttpTestingController);
    http.expectOne(`${API_URL}/products?category=mezuzahs`).flush([]);

    expect(page).toBeInstanceOf(ShopCategoryPage);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('מזוזות');
  });

  it('opens the contact page', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/contact', ContactPage);

    expect(page).toBeInstanceOf(ContactPage);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('יצירת קשר');
  });

  it('redirects unknown paths home', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/missing', HomePage);
    flushCatalog();

    expect(page).toBeInstanceOf(HomePage);
  });
});
