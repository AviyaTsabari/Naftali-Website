import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Poem } from '../../models/poem';
import { PoemCard } from './poem-card';

const sample: Poem = {
  id: 'poem-2025-03-20',
  date: '2025-03-20',
  title: 'כֹּתֶרֶת',
  body: 'שׁוּרָה רִאשׁוֹנָה של השיר לדוגמה.\n\nשׁוּרָה שְׁנִיָּה שלא אמורה להופיע בכרטיס.',
};

@Component({
  imports: [PoemCard],
  template: `<app-poem-card [poem]="poem" />`,
})
class Host {
  poem = sample;
}

describe('PoemCard', () => {
  it('uses the poem title as the card heading and links to the full poem', () => {
    TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2')?.textContent).toContain('כֹּתֶרֶת');
    expect(fixture.nativeElement.textContent).toContain('2025-03-20');
    expect(fixture.nativeElement.textContent).toContain('שׁוּרָה רִאשׁוֹנָה');
    expect(fixture.nativeElement.textContent).not.toContain('שׁוּרָה שְׁנִיָּה');
    expect(fixture.nativeElement.querySelector('a')?.getAttribute('href')).toBe(
      '/poetry/poem-2025-03-20',
    );
  });
});
