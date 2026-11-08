import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { API_URL } from '../core/api';
import { Catalog } from './catalog';

const sampleProduct = {
  id: 'prod-tamar',
  name: 'דגם תמר',
  category: 'mezuzahs' as const,
  price: 100,
  currency: null,
  image: null,
  description: 'תיאור יוצג כאן',
  available: true,
};

const samplePoem = {
  id: 'poem-2025-03-20',
  date: '2025-03-20',
  title: 'כֹּתֶרֶת',
  body: 'שׁוּרָה רִאשׁוֹנָה\n\nשׁוּרָה שְׁנִיָּה',
};

describe('Catalog', () => {
  let catalog: Catalog;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    catalog = TestBed.inject(Catalog);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('loads products and poems from the backend', async () => {
    const productsPending = firstValueFrom(catalog.listProducts());
    http.expectOne(`${API_URL}/products`).flush([sampleProduct]);
    const poemsPending = firstValueFrom(catalog.listPoems());
    http.expectOne(`${API_URL}/poems`).flush([samplePoem]);

    expect(await productsPending).toEqual([sampleProduct]);
    expect(await poemsPending).toEqual([samplePoem]);
  });

  it('requests a category filter and a single poem', async () => {
    const productsPending = firstValueFrom(catalog.listProducts('furniture'));
    http.expectOne(`${API_URL}/products?category=furniture`).flush([]);
    const poemPending = firstValueFrom(catalog.getPoem(samplePoem.id));
    http.expectOne(`${API_URL}/poems/${samplePoem.id}`).flush(samplePoem);

    expect(await productsPending).toEqual([]);
    expect(await poemPending).toEqual(samplePoem);
  });

  it('maps backend failures to Hebrew errors', async () => {
    const productsPending = firstValueFrom(catalog.listProducts());
    http
      .expectOne(`${API_URL}/products`)
      .flush({ detail: 'error' }, { status: 500, statusText: 'Server Error' });
    await expectAsync(productsPending).toBeRejectedWithError('לא ניתן לטעון את המוצרים כרגע');

    const categoryPending = firstValueFrom(catalog.listProducts('mezuzahs'));
    http
      .expectOne(`${API_URL}/products?category=mezuzahs`)
      .flush({ detail: 'Unknown product category' }, { status: 400, statusText: 'Bad Request' });
    await expectAsync(categoryPending).toBeRejectedWithError('הקטגוריה לא נמצאה');

    const poemPending = firstValueFrom(catalog.getPoem('missing'));
    http
      .expectOne(`${API_URL}/poems/missing`)
      .flush({ detail: 'Poem not found' }, { status: 404, statusText: 'Not Found' });
    await expectAsync(poemPending).toBeRejectedWithError('השיר לא נמצא');
  });
});
