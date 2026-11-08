import { TestBed } from '@angular/core/testing';
import { PoetryPage } from './poetry';

describe('PoetryPage', () => {
  it('renders the poetry heading', () => {
    const fixture = TestBed.createComponent(PoetryPage);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('שירה');
  });
});
