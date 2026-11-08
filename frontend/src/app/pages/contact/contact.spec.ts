import { TestBed } from '@angular/core/testing';
import { ContactPage } from './contact';

describe('ContactPage', () => {
  it('renders the contact heading', () => {
    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('יצירת קשר');
  });
});
