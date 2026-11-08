import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Cart } from '../../services/cart';
import { Header } from './header';

describe('Header', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([]), Cart],
    }).compileComponents();
  });

  it('renders Hebrew navigation', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;

    expect(text).toContain('בית');
    expect(text).toContain('שירה');
    expect(text).toContain('חנות');
    expect(text).toContain('יצירת קשר');
    expect(text).toContain('כניסה');
  });

  it('shows a zero cart count', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    const count = fixture.nativeElement.querySelector('.cart-count');

    expect(count?.textContent?.trim()).toBe('0');
  });

  it('opens the cart preview', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.cart-button').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('העגלה ריקה');
    expect(fixture.nativeElement.textContent).toContain('התשלום יתאפשר בקרוב');
  });

  it('opens the login preview', () => {
    const fixture = TestBed.createComponent(Header);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('.login-button').click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('תצוגה מקדימה — הכניסה תתאפשר בקרוב');
  });
});
