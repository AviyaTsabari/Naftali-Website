import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ShopPage } from './shop';

describe('ShopPage', () => {
  it('renders shop categories', () => {
    TestBed.configureTestingModule({
      imports: [ShopPage],
      providers: [provideRouter([])],
    });
    const fixture = TestBed.createComponent(ShopPage);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;

    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('חנות');
    expect(text).toContain('מזוזות');
    expect(text).toContain('חנוכיות');
    expect(text).toContain('ריהוט בוטיק');
    expect(text).toContain('לדוגמה');

    const hrefs = [...fixture.nativeElement.querySelectorAll('.categories a')].map(
      (link: HTMLAnchorElement) => link.getAttribute('href'),
    );
    expect(hrefs).toEqual(['/shop/mezuzahs', '/shop/hanukkiahs', '/shop/furniture']);
  });
});
