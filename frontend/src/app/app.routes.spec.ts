import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { ContactPage } from './pages/contact/contact';
import { HomePage } from './pages/home/home';
import { PoetryPage } from './pages/poetry/poetry';
import { ShopPage } from './pages/shop/shop';

describe('routes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
  });

  it('opens the home page', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/', HomePage);

    expect(page).toBeInstanceOf(HomePage);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('נפתלי');
  });

  it('opens the poetry page', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/poetry', PoetryPage);

    expect(page).toBeInstanceOf(PoetryPage);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('שירה');
  });

  it('opens the shop page', async () => {
    const harness = await RouterTestingHarness.create();
    const page = await harness.navigateByUrl('/shop', ShopPage);

    expect(page).toBeInstanceOf(ShopPage);
    expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain('חנות');
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

    expect(page).toBeInstanceOf(HomePage);
  });
});
