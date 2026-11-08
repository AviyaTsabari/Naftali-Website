import { TestBed } from '@angular/core/testing';
import { ContactPage } from './contact';

describe('ContactPage', () => {
  it('renders contact placeholders without invented details', () => {
    const fixture = TestBed.createComponent(ContactPage);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('יצירת קשר');
    expect(text).toContain('טלפון — יוצג כאן');
    expect(text).toContain('דוא״ל — יוצג כאן');
    expect(fixture.nativeElement.querySelector('a[href^="tel:"]')).toBeNull();
    expect(fixture.nativeElement.querySelector('a[href^="mailto:"]')).toBeNull();
  });
});
