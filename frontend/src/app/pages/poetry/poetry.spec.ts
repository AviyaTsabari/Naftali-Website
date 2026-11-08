import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { API_URL } from '../../core/api';
import { PoetryPage } from './poetry';

describe('PoetryPage', () => {
  it('renders mock poem cards and a WhatsApp coming-soon note', () => {
    TestBed.configureTestingModule({
      imports: [PoetryPage],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    });
    const fixture = TestBed.createComponent(PoetryPage);
    fixture.detectChanges();

    const http = TestBed.inject(HttpTestingController);
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
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('שירה');
    expect(text).toContain('כֹּתֶרֶת');
    expect(text).toContain('2025-03-20');
    expect(text).toContain('לשיר המלא');
    expect(text).toContain('ניוזלטר בוואטסאפ — בקרוב');
    expect(text).toContain('לא נאסף מספר טלפון בשלב זה');
    expect(fixture.nativeElement.querySelector('input')).toBeNull();
    http.verify();
  });
});
