import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { API_URL } from '../../../core/api';
import { PoemDetailPage } from './poem-detail';

describe('PoemDetailPage', () => {
  it('shows the mock poem with the date as the heading', async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'poetry/:id', component: PoemDetailPage }]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/poetry/poem-2024-03-12', PoemDetailPage);

    const http = TestBed.inject(HttpTestingController);
    http.expectOne(`${API_URL}/poems/poem-2024-03-12`).flush({
      id: 'poem-2024-03-12',
      date: '2024-03-12',
      title: '',
      body: 'טקסט לדוגמה בלבד. השיר המלא יפורסם כאן.',
    });
    harness.detectChanges();

    const root = harness.routeNativeElement as HTMLElement;
    expect(root.querySelector('h1')?.textContent).toContain('2024-03-12');
    expect(root.textContent).toContain('טקסט לדוגמה בלבד');
    http.verify();
  });
});
