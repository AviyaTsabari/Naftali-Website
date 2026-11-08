import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Poem } from '../../models/poem';
import { PoemCard } from './poem-card';

const sample: Poem = {
  id: 'poem-2024-03-12',
  date: '2024-03-12',
  title: '',
  body: 'טקסט לדוגמה בלבד. השיר המלא יפורסם כאן.',
};

@Component({
  imports: [PoemCard],
  template: `<app-poem-card [poem]="poem" />`,
})
class Host {
  poem = sample;
}

describe('PoemCard', () => {
  it('uses the date as the card title and links to the full poem', () => {
    TestBed.configureTestingModule({
      imports: [Host],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(Host);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2')?.textContent).toContain('2024-03-12');
    expect(fixture.nativeElement.textContent).toContain('טקסט לדוגמה בלבד');
    expect(fixture.nativeElement.querySelector('a')?.getAttribute('href')).toBe(
      '/poetry/poem-2024-03-12',
    );
  });
});
