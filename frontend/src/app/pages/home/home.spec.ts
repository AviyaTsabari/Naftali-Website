import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { API_URL } from '../../core/api';
import { HomePage } from './home';

describe('HomePage', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  it('renders the studio introduction, assistant placeholder, and featured content', () => {
    const fixture = TestBed.createComponent(HomePage);
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
        description: '',
        available: true,
      },
    ]);
    http.expectOne(`${API_URL}/poems`).flush([
      {
        id: 'poem-2025-03-20',
        date: '2025-03-20',
        title: 'כֹּתֶרֶת',
        body: 'שׁוּרָה רִאשׁוֹנָה של השיר.',
      },
    ]);
    fixture.detectChanges();

    const text = fixture.nativeElement.textContent as string;
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('נפתלי');
    expect(text).toContain('גדעונה');
    expect(text).toContain('עץ');
    expect(text).toContain('שירה');
    expect(text).toContain('חנות');
    expect(text).toContain('יצירת קשר');
    expect(text).toContain('עוזר הסטודיו — בקרוב');
    expect(text).toContain('אין מענה אוטומטי בשלב זה');
    expect(text).toContain('דגם תמר');
    expect(text).toContain('כֹּתֶרֶת');
    expect(fixture.nativeElement.querySelector('input')).toBeNull();
    http.verify();
  });
});
