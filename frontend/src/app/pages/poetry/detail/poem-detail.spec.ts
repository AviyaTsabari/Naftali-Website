import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { API_URL } from '../../../core/api';
import { PoemDetailPage } from './poem-detail';

describe('PoemDetailPage', () => {
  it('shows the poem title, date, and body', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'poetry/:id', component: PoemDetailPage }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/poetry/poem-2025-03-20', PoemDetailPage);

    const http = TestBed.inject(HttpTestingController);
    http.expectOne(`${API_URL}/poems/poem-2025-03-20`).flush({
      id: 'poem-2025-03-20',
      date: '2025-03-20',
      title: 'כֹּתֶרֶת',
      body: 'שׁוּרָה רִאשׁוֹנָה\n\nשׁוּרָה שְׁנִיָּה',
    });
    harness.detectChanges();

    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('כֹּתֶרֶת');
    expect(root.textContent).toContain('2025-03-20');
    const body = root.querySelector('.body') as HTMLElement;
    expect(body.textContent).toBe('שׁוּרָה רִאשׁוֹנָה\n\nשׁוּרָה שְׁנִיָּה');
    expect(getComputedStyle(body).whiteSpace).toBe('pre-wrap');
    http.verify();
  });
});
