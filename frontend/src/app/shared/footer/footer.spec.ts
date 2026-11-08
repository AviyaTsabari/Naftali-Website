import { TestBed } from '@angular/core/testing';
import { Footer } from './footer';

describe('Footer', () => {
  it('renders the studio name', () => {
    const fixture = TestBed.createComponent(Footer);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('סטודיו נפתלי');
    expect(fixture.nativeElement.textContent).toContain('עץ · אבן · שירה');
  });
});
